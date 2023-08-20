import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.03125rem',
    },
    h2: {
      fontSize: '1.625rem',
    },
    h3: {
      fontSize: '1.42188rem',
    },
    h4: {
      fontSize: '1.21875rem',
    },
    h5: {
      fontSize: '1.01562rem',
    },
    h6: {
      fontSize: '0.8125rem',
    },
    body1: {
      fontSize: '0.8125rem',
    },
    body2: {
      fontSize: '0.8125rem',
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[300],
    },
  },
})