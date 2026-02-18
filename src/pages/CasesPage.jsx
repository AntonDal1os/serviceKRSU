import React from 'react';
import { Container, Typography } from '@mui/material';

const CasesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Кейсы
      </Typography>
      <Typography variant="body1">
        Раздел кейсов находится в разработке.
      </Typography>
    </Container>
  );
};

export default CasesPage;