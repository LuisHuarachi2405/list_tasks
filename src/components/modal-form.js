import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Box, Button, Dialog, MenuItem, TextField } from '@mui/material'
import { useTaskForm } from '../hooks/use-task-form'
import { addTask, updateTask } from '../services/task.services'
import { toast } from 'react-hot-toast'

export const ModalForm = ({ itemToEdit, open, handleClose, callEndpoint, setListTask }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useTaskForm({ itemToEdit })

  const onSubmit = async (formData) => {
    try {
      if (itemToEdit === null) {
        const task = await callEndpoint(addTask({descripcion: formData.descripcion, estado: formData.estado}));
        setListTask(prev => prev.concat(task.data.content));
      } else {
        const task = await callEndpoint(updateTask(formData));
        setListTask((prev) => {
          const newList = prev.map(item => {
            if (item.id === task.data.content.id) {
              return { ...item, ...task.data.content };
            }
            return item;
          });

          return newList;
        });
      }

      handleClose()

      toast.success(`Tarea ${itemToEdit !== null ? 'actualizada' : 'creada'} exitosamente`, {
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

  useEffect(() => {
    if (open === true && itemToEdit !== null) {
      reset({
        id: itemToEdit.id,
        descripcion: itemToEdit.descripcion,
        estado: itemToEdit.estado
      })
    }
  }, [reset, open, itemToEdit])

  useEffect(() => {
    if (open === false) {
      reset({
        id: null,
        descripcion: '',
        estado: ''
      })
    }
  }, [reset, open])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box display="flex" flexDirection="column" gap="16px" padding="32px">
        <h2>{itemToEdit === null ? 'Agregar Tarea' : `Editar tarea`}</h2>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap="16px"
        >
          <Controller
            control={control}
            name="descripcion"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                inputRef={field.ref}
                error={errors.descripcion !== undefined}
                helperText={
                  errors.descripcion?.message !== undefined &&
                  errors.descripcion.message
                }
                label="Descripcion"
              >
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="estado"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                size="small"
                inputRef={field.ref}
                error={errors.estado !== undefined}
                helperText={
                  errors.estado?.message !== undefined &&
                  errors.estado.message
                }
                label="Estado"
              >
                <MenuItem
                  value="pendiente"
                >
                  Pendiente
                </MenuItem>

                <MenuItem
                  value="completado"
                >
                  Completado
                </MenuItem>
              </TextField>
            )}
          />

          <Box display="flex" justifyContent="flex-end" gap="16px">
            <Button type="button" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}