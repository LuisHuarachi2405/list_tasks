import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

export const AlertDialog = (props) => {
  const { open, handleOpen, dialogTitle, dialogContent, onConfirm, icon } = props

  return (
    <Dialog
      open={open}
      color="primary"
      onClose={handleOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography fontSize="h6" fontWeight="bold">
          {dialogTitle}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" gap="8px">
          {icon && (
            <Box display="flex" alignItems="center">
              {icon}
            </Box>
          )}
          <Typography component="span">{dialogContent}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOpen}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}