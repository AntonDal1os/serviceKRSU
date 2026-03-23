import React from 'react';
import { Container, Typography } from '@mui/material';

const ExperiencePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Опыт
      </Typography>
      <Typography variant="body1">
        Раздел опыта находится в разработке.
      </Typography>
    </Container>
  );
};

export default ExperiencePage;