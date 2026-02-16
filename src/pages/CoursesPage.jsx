import React from 'react';
import { Container, Typography } from '@mui/material';

const CoursesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Курсы
      </Typography>
      <Typography variant="body1">
        Раздел курсов находится в разработке.
      </Typography>
    </Container>
  );
};

export default CoursesPage;