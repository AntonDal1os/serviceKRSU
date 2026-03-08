import React from 'react';
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School as SchoolIcon,
  Description as DescriptionIcon,
  BusinessCenter as BusinessCenterIcon,
  Work as WorkIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ActionButtons = () => {
  const navigate = useNavigate();
  
  const buttons = [
    {
      title: 'Курсы',
      description: 'Образовательные программы и курсы',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: '/courses',
      color: '#003366',
    },
    {
      title: 'Документы',
      description: 'Учебные и нормативные документы',
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      path: '/documents',
      color: '#004080',
    },
    {
      title: 'Кейсы',
      description: 'Практические задачи и решения',
      icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />,
      path: '/cases',
      color: '#00509e',
    },
    {
      title: 'Опыт',
      description: 'Опыт студентов и выпускников',
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      path: '/experience',
      color: '#0066cc',
    },
    {
      title: 'О портале',
      description: 'Информация о системе',
      icon: <InfoIcon sx={{ fontSize: 40 }} />,
      path: '/about',
      color: '#0077e6',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ mb: 6 }}
      >
        Основные разделы
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {buttons.map((button, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
            <Box
              sx={{
                p: 4,
                width: { xs: '100%', md: '337.53px' },
                maxWidth: { xs: '100%', md: '337.53px' },
                height: { xs: '100%', md: '340px' },
                minHeight: { xs: 320, md: '340px' },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                backgroundColor: 'white',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: `${button.color}15`,
                  color: button.color,
                  mb: 3,
                }}
              >
                {button.icon}
              </Box>
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {button.title}
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, flexGrow: 1 }}
              >
                {button.description}
              </Typography>
              
              <Button
                variant="contained"
                fullWidth
                sx={{
                  minHeight: 44,
                  backgroundColor: button.color,
                  '&:hover': {
                    backgroundColor: button.color,
                    opacity: 0.9,
                  },
                }}
                onClick={() => navigate(button.path)}
              >
                Перейти
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActionButtons;
