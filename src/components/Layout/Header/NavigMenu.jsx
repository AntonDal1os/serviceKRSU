// src/components/Layout/Header/NavMenu.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { title: 'Главная', path: '/' },
    { title: 'Кейсы ЭОиДОТ', path: '/cases' },
    { title: 'Опыт СПбПУ', path: '/experience' },
    { title: 'База документов', path: '/documents' },
    { title: 'Каталог курсов', path: '/courses' },
    { title: 'О проекте', path: '/about' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Мобильная версия
  if (isMobile) {
    return (
      <>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path} 
              component={Link} 
              to={item.path}
              onClick={handleMenuClose}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  // Десктопная версия
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          component={Link}
          to={item.path}
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          {item.title}
        </Button>
      ))}
    </Box>
  );
};

export default NavMenu;