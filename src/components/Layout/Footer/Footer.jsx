// src/components/Layout/Footer/Footer.jsx
import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  Box,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const supportEmail = 'support@spbstu.ru';
  const mailSubject = 'Поддержка платформы СПбПУ';
  const mailToHref = `mailto:${supportEmail}?subject=${encodeURIComponent(mailSubject)}`;
  const address = '195251, Санкт-Петербург, ул. Политехническая, дом 29, Научно-исследовательский корпус';
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const publicBase = process.env.PUBLIC_URL || '';
  const privacyPdfHref = `${publicBase}/docs/personal_data_policy.pdf`;
  const cookiePdfHref = `${publicBase}/docs/personal_cookie.pdf`;
  const vkHref = 'https://vk.com/polytech_petra';

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
              <MuiLink 
                href={mailToHref}
                color="inherit"
                underline="hover"
              >
                {supportEmail}
              </MuiLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <MuiLink href="tel:+78121234567" color="inherit" underline="hover">
                +7 (812) 123-45-67
              </MuiLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <MuiLink
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
              >
                {address}
              </MuiLink>
            </Box>
          </Grid>

          {/* Документы */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Документы
            </Typography>
            <MuiLink
              href={privacyPdfHref}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              underline="hover"
            >
              Политика конфиденциальности
            </MuiLink>
            <MuiLink
              href={cookiePdfHref}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              underline="hover"
            >
              Политика обработки cookie
            </MuiLink>
          </Grid>

          {/* Социальные сети */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Социальные сети
            </Typography>
            <MuiLink
              href={vkHref}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              display="inline-block"
            >
              VK
            </MuiLink>
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
