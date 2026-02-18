import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        О портале
      </Typography>
      <Typography variant="body1">
        Раздел "О портале" находится в разработке.
      </Typography>
    </Container>
  );
};

export default AboutPage;