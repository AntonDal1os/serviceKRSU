// src/components/Layout/Header/Header.jsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NavigMenu from './NavigMenu';
import logo from '../../../assets/images/logo_1.png';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 2 }}>
          {/* Логотип и название */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box 
              component="img"
              src={logo}
              alt="СПбПУ"
              sx={{ 
                height: 50,
                mr: 2,
                filter: 'brightness(0) invert(1)' // Для белого логотипа
              }}
            />
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 600,
                fontSize: isMobile ? '1rem' : '1.25rem'
              }}
            >
              Санкт-Петербургский политехнический университет Петра Великого
            </Typography>
          </Box>

          {/* Навигационное меню */}
          <NavigMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;