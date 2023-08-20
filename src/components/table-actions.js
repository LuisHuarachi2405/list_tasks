import { useState } from 'react'
import { CheckCircle, CheckCircleOutline, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Box } from '@mui/system'

export const TableActions = (props) => {
  const { row, setFormModalState, setRemoveModalState, onStatusUpdate } = props

  const handleOpenFormModal = () => {
    setFormModalState({
      open: true,
      itemToEdit: row,
    })
  }

  const handleOpenRemoveModal = () => {
    setRemoveModalState({
      open: true,
      name: row.descripcion,
      id: row.id
    })
  }

  const handleUpdateStateTask = async () => {
    await onStatusUpdate({
      id: row.id,
      descripcion: row.descripcion,
      estado: "completado"
    })
  }

  return (
    <Box display="flex" gap="8px" justifyContent="center" width="100%">
      <IconButton color="primary" onClick={handleOpenFormModal}>
        <Edit fontSize="small" />
      </IconButton>

      <IconButton color="primary" onClick={handleUpdateStateTask}>
        {row.estado === "completado" ? (
          <CheckCircle fontSize="small" />
        ) : <CheckCircleOutline fontSize="small"/>}
      </IconButton>

      <IconButton onClick={handleOpenRemoveModal}>
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  )
}