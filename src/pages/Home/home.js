

import { Box, Button, Container, Typography } from "@mui/material";
import { useAsync } from "../../hooks/async-component-clean";
import useFetchAndLoad from "../../hooks/use-fetch-and-load";
import { getTasks, removeTask, updateTask } from "../../services/task.services";
import TableTask from "../../components/table";
import { useState } from "react";
import { useBuildColumns } from "../../hooks/use-build-columns";
import { ModalForm } from '../../components/modal-form'
import { AlertDialog } from "../../components/alert-dialog";
import { ErrorOutline } from "@mui/icons-material";
import { toast } from "react-hot-toast";

function Home() {
  const [listTask, setListTask] = useState([])
  const { loading, callEndpoint } = useFetchAndLoad();

  const [removeModalState, setRemoveModalState] = useState({
    open: false,
    item: null,
    id: null
  })

  const [formModalState, setFormModalState] = useState({
    open: false,
    itemToEdit: null,
  })
  
  const handleCloseModalDelete = () => {
    setRemoveModalState(prevState => ({
      ...prevState,
      open: false
    }));
  }

  const handleCloseModalForm = () => {
    setFormModalState({
      itemToEdit: null,
      open: false
    });
  }

  const handleOpenModalForm = () => {
    setFormModalState({
      itemToEdit: null,
      open: true
    });
  }

  const onStatusUpdate = async (item) => {
     try {
      const task = await callEndpoint(updateTask(item));
      setListTask((prev) => {
        const newList = prev.map(item => {
          if (item.id === task.data.content.id) {
            return { ...item, ...task.data.content };
          }
          return item;
        });

        return newList;
      });

      toast.success('Tarea completada exitosamente', {
        position: 'bottom-center',
        duration: 2000,
      })
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-right',
        duration: 2000,
      })
    }
  } 

  const { columns } = useBuildColumns({setFormModalState, setRemoveModalState, onStatusUpdate})

  const getApiData = async () => await callEndpoint(getTasks());

  const succesListTask = (data) => {
    setListTask(data.content ?? [])
  }

  const errorListTask = (error) => {
    toast.error(`Upps ocurrio algo inesperado: ${error}`, {
      position: 'bottom-center',
      duration: 2000,
    })
  }

  useAsync(getApiData, succesListTask, errorListTask, () => {}, []);

  const onDeleteConfirm = async () => {
    try {
      await callEndpoint(removeTask(removeModalState.id));
      const newListTask = listTask.filter(item => item.id !== removeModalState.id);
      setListTask(newListTask);

      handleCloseModalDelete()

      toast.success('Tarea eliminada exitosamente', {
        position: 'bottom-center',
        duration: 2000,
      })
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-right',
        duration: 2000,
      })
    }
  }
  
  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h2">
          Lista de Tareas
        </Typography>
      </Box>

      <Box mb={2}>
        <Button onClick={handleOpenModalForm} variant="contained">Agregar</Button>
      </Box>

      <Box>
        <TableTask 
          columns={columns} 
          rows={listTask} 
          loading={loading} 
          getRowId={(row) => row.id}/>
      </Box>
      
      <ModalForm
        open={formModalState.open}
        setListTask={setListTask}
        itemToEdit={formModalState.itemToEdit}
        handleClose={handleCloseModalForm}
        callEndpoint={callEndpoint}
      />

      <AlertDialog
        open={removeModalState.open}
        maxWidth="sm"
        handleOpen={handleCloseModalDelete}
        dialogTitle={`¿Está seguro que desea eliminar la tarea: ${removeModalState.name}?`}
        dialogContent="Esta acción no puede deshacerse."
        onConfirm={onDeleteConfirm}
        icon={<ErrorOutline />}
      />
    </Container>
  );
}

export default Home;
