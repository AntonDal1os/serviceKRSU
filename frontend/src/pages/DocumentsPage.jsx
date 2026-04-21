import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfessionalDevelopmentRequestForm from '../components/ProfessionalDevelopmentRequestForm';
import { courses } from '../data/courses';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

const documentTemplates = [
  {
    id: 'statement',
    title: 'Заявление на повышение квалификации',
    description: 'Шаблон заявления для обучения по программе повышения квалификации.',
    href: '/templates/prof-dev-statement.docx',
  },
  {
    id: 'consent',
    title: 'Согласие на обработку персональных данных',
    description: 'Шаблон согласия на обработку персональных данных.',
    href: '/templates/personal-data-consent.docx',
  },
];

const programDescriptions = {
  frontend: 'Проектирование интерфейсов, адаптивная верстка и работа с UI-компонентами.',
  backend: 'Разработка серверной логики, проектирование API и практика с базами данных.',
  qa: 'Тест-дизайн, ручное и автоматизированное тестирование, работа с отчетностью.',
  uiux: 'Исследование пользователей, прототипирование и оформление интерфейсов.',
};

const qualificationPrograms = courses.map((course) => ({
  ...course,
  summary: programDescriptions[course.id] || 'Краткое описание программы и ожидаемые результаты обучения.',
}));

const contentMaxWidth = 976;

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
        Повышение квалификации
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Формы, правила и шаблоны документов для подачи заявки.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          borderColor: 'rgba(15, 23, 42, 0.12)',
          backgroundColor: '#f2fbfb',
          mb: 4,
          mx: 'auto',
          width: '100%',
          maxWidth: { xs: '100%', md: contentMaxWidth },
          transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 12px 28px rgba(15, 23, 42, 0.12)',
            borderColor: 'rgba(21, 101, 192, 0.35)',
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Программы повышения квалификации
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Выберите программу, чтобы ознакомиться с содержанием и результатами обучения.
              </Typography>
            </Box>
            <Chip
              size="small"
              color="primary"
              label={`${qualificationPrograms.length} программы`}
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          <Stack spacing={1}>
            {qualificationPrograms.map((program) => (
              <Accordion
                key={program.id}
                disableGutters
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  boxShadow: 'none',
                  backgroundColor: '#ffffff',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease',
                  '&:before': { display: 'none' },
                  '&:hover': {
                    borderColor: 'rgba(21, 101, 192, 0.45)',
                    boxShadow: '0px 10px 22px rgba(15, 23, 42, 0.08)',
                    backgroundColor: '#f6fbff',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {program.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="body2" color="text.secondary">
                      {program.summary}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                      Выбрать программу
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '360px 600px' },
          gap: { xs: 2, md: 2 },
          alignItems: 'start',
          justifyContent: 'center',
          mx: 'auto',
          width: '100%',
          maxWidth: { xs: '100%', md: contentMaxWidth },
        }}
      >
        <Stack spacing={2} sx={{ justifySelf: { xs: 'stretch', md: 'center' } }}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: '#f7f9fc',
              borderColor: 'rgba(15, 23, 42, 0.12)',
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

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: '#fdfdfd',
              borderColor: 'rgba(15, 23, 42, 0.12)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Шаблоны документов
            </Typography>
            <Stack spacing={2}>
              {documentTemplates.map((template) => (
                <Paper
                  key={template.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: 'rgba(15, 23, 42, 0.12)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {template.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      component="a"
                      href={template.href}
                      download
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Скачать шаблон
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfessionalDevelopmentRequestForm courses={courses} onSubmit={handleQualificationSubmit} />
        </Box>
      </Box>
    </Container>
  );
};

export default DocumentsPage;
