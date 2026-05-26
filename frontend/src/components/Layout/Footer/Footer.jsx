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
  const address = '195251, Санкт-Петербург, Политехническая ул., 29';
  const mapsHref = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
  const privacyPdfHref = '/docs/personal_data_policy.pdf';
  const cookiePdfHref = '/docs/personal_cookie.pdf';
  const vkHref = 'https://vk.com/polytech_petra';
  const contacts = [
    {
      icon: LocationOnIcon,
      label: address,
      href: mapsHref,
      external: true,
    },
    {
      icon: PhoneIcon,
      label: '+7 (812) 123-45-67',
      href: 'tel:+78121234567',
    },
    {
      icon: EmailIcon,
      label: 'support@spbstu.ru',
      href: `mailto:support@spbstu.ru?subject=${encodeURIComponent('Поддержка платформы СПбПУ')}`,
    },
    {
      icon: EmailIcon,
      label: 'openedu@spbstu.ru',
      caption: 'Поддержка НПОО',
      href: `mailto:openedu@spbstu.ru?subject=${encodeURIComponent('Поддержка НПОО')}`,
    },
    {
      icon: EmailIcon,
      label: 'sdo@spbstu.ru',
      caption: 'Поддержка СДО',
      href: `mailto:sdo@spbstu.ru?subject=${encodeURIComponent('Поддержка СДО')}`,
    },
  ];
  const sectionTitleSx = {
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.3,
    mb: 1.25,
  };
  const footerTextSx = {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  };
  const contactRowSx = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    mb: 1,
    textAlign: 'left',
  };
  const iconSx = {
    mt: '2px',
    fontSize: 18,
    flexShrink: 0,
    opacity: 0.9,
  };
  const columnSx = {
    textAlign: { xs: 'center', md: 'left' },
  };
  const contactsColumnSx = {
    mx: { xs: 'auto', md: 0 },
    maxWidth: 360,
  };

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
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
          {/* Документы и копирайт */}
          <Grid item xs={12} md={4} sx={columnSx}>
            <Typography component="h2" sx={sectionTitleSx}>
              Документы
            </Typography>
            <MuiLink
              href={privacyPdfHref}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              underline="hover"
              sx={{ ...footerTextSx, mb: 0.75 }}
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
              sx={{ ...footerTextSx, mb: 1.25 }}
            >
              Политика обработки cookie
            </MuiLink>
            <Typography sx={{ ...footerTextSx, color: 'rgba(255,255,255,0.72)' }}>
              При использовании материалов портала активная ссылка на источник обязательна.
            </Typography>
          </Grid>

          {/* Контактная информация */}
          <Grid item xs={12} md={4}>
            <Box sx={contactsColumnSx}>
              <Typography component="h2" sx={{ ...sectionTitleSx, textAlign: { xs: 'center', md: 'left' } }}>
                Контакты
              </Typography>
              {contacts.map(({ icon: Icon, label, caption, href, external }) => (
                <Box
                  key={label}
                  sx={{
                    ...contactRowSx,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Icon sx={iconSx} />
                  <Box>
                    <MuiLink
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      color="inherit"
                      underline="hover"
                      sx={footerTextSx}
                    >
                      {label}
                    </MuiLink>
                    {caption && (
                      <Typography sx={{ ...footerTextSx, color: 'rgba(255,255,255,0.72)' }}>
                        {caption}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Социальные сети */}
          <Grid item xs={12} md={4} sx={columnSx}>
            <Typography component="h2" sx={sectionTitleSx}>
              Мы в социальных сетях
            </Typography>
            <MuiLink
              href={vkHref}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{
                ...footerTextSx,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '50%',
                fontWeight: 700,
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderColor: 'rgba(255,255,255,0.75)',
                },
              }}
            >
              VK
            </MuiLink>
          </Grid>
        </Grid>

        {/* Копирайт */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography align="center" sx={{ ...footerTextSx, color: 'rgba(255,255,255,0.78)' }}>
            © {currentYear} Санкт-Петербургский политехнический университет Петра Великого
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
