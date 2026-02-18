import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
      light: '#3d5a80',
      dark: '#001a33',
    },
    secondary: {
      main: '#ff6600',
      light: '#ff944d',
      dark: '#cc5200',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#003366',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#003366',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#003366',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#001a33',
          },
        },
      },
    },
  },
});

// Правильный экспорт:
export default theme; // <-- Используйте export default