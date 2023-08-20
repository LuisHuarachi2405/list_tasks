import { Switch } from "@mui/material";
import { TableActions } from "../components/table-actions";

export const useBuildColumns = ({setFormModalState, setRemoveModalState, onStatusUpdate}) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 1  },
    { 
      field: 'estado', 
      headerName: 'Estado',
      flex: 1,
      renderCell: (params) => {
        const label = { inputProps: { 'aria-label': 'Color switch demo' }};
        const checked = params.value === "pendiente" ? false : true
        return <Switch {...label} checked={checked} color="secondary" />
      }, 
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      headerAlign: 'center',
      flex: 1,
      renderCell: ({ row }) => <TableActions row={row} setFormModalState={setFormModalState} setRemoveModalState={setRemoveModalState} onStatusUpdate={onStatusUpdate} />,
    },
  ];

  return { columns }
}