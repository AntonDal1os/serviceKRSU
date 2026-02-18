import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 3,
          }}
        >
          Портал СПбПУ
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            lineHeight: 1.6,
          }}
        >
          Добро пожаловать на образовательный портал Санкт-Петербургского политехнического университета Петра Великого
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;