import React from 'react';
import { Container, Typography } from '@mui/material';

const DocumentsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Документы
      </Typography>
      <Typography variant="body1">
        Раздел документов находится в разработке.
      </Typography>
    </Container>
  );
};

export default DocumentsPage;