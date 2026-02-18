// src/components/Layout/Footer/Footer.jsx
import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Box,
  IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#003366',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Контактная информация */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Контакты
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Link 
                href="mailto:support@spbstu.ru" 
                color="inherit"
                underline="hover"
              >
                support@spbstu.ru
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography>+7 (812) 123-45-67</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography>г. Санкт-Петербург, Политехническая ул., 29</Typography>
            </Box>
          </Grid>

          {/* Быстрые ссылки */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Политики
            </Typography>
            <Link href="/privacy" color="inherit" display="block" underline="hover">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" color="inherit" display="block" underline="hover">
              Условия использования
            </Link>
            <Link href="/cookies" color="inherit" display="block" underline="hover">
              Политика использования cookies
            </Link>
          </Grid>

          {/* Партнеры */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Вузы-партнеры
            </Typography>
            <Typography variant="body2">
              КРСУ, БГУ, КазНУ и другие университеты СНГ
            </Typography>
          </Grid>
        </Grid>

        {/* Копирайт */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" align="center">
            © {currentYear} Санкт-Петербургский политехнический университет Петра Великого. 
            Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;