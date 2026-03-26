import React from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import ProfessionalDevelopmentRequestForm from '../components/ProfessionalDevelopmentRequestForm';
import { courses } from '../data/courses';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

const DocumentsPage = () => {
  const handleQualificationSubmit = async (payload) => {
    try {
      const formData = new FormData();
      formData.append('courseId', payload.courseId);
      formData.append('fullName', payload.fullName);
      formData.append('email', payload.email);
      if (payload.phone) {
        formData.append('phone', payload.phone);
      }
      if (payload.statementFile) {
        formData.append('statementFile', payload.statementFile);
      }
      if (payload.consentFile) {
        formData.append('consentFile', payload.consentFile);
      }

      const response = await fetch(`${API_BASE_URL}/prof-dev`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to submit professional development request');
      }

      console.log('Professional development submitted:', data);
    } catch (error) {
      console.error('Professional development submit error:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Документы
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Здесь собраны формы и документы, которые нужны для обучения и повышения квалификации.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Подача заявки на повышение квалификации
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Заполните форму и приложите заявление с согласием на обработку персональных данных.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 360px) minmax(0, 1fr)' },
          gap: { xs: 2, md: 2 },
          alignItems: 'start',
          justifyContent: 'center',
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: '#f7f9fc',
            borderColor: 'rgba(15, 23, 42, 0.12)',
            justifySelf: { xs: 'stretch', md: 'center' },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Правила подачи заявки
          </Typography>
          <Stack spacing={1.5}>
            <Typography variant="body2">1. Заполните все обязательные поля без сокращений.</Typography>
            <Typography variant="body2">2. Укажите актуальные email и номер телефона.</Typography>
            <Typography variant="body2">
              3. Приложите подписанное заявление на повышение квалификации.
            </Typography>
            <Typography variant="body2">
              4. Приложите согласие на обработку персональных данных.
            </Typography>
            <Typography variant="body2">5. Допустимые форматы файлов: .doc, .docx, .pdf.</Typography>
            <Typography variant="body2">
              6. Отправьте заявку один раз после проверки всех данных.
            </Typography>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfessionalDevelopmentRequestForm courses={courses} onSubmit={handleQualificationSubmit} />
        </Box>
      </Box>
    </Container>
  );
};

export default DocumentsPage;
