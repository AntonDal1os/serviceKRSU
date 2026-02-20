import React, { useState } from 'react';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import CourseEnrollmentForm from '../components/CourseEnrollmentForm';
import ProfessionalDevelopmentRequestForm from '../components/ProfessionalDevelopmentRequestForm';

const universities = [
  { id: 'krsu', name: 'КРСУ им. Б. Н. Ельцина' },
  { id: 'kstu', name: 'КГТУ им. И. Раззакова' },
  { id: 'ksua', name: 'КГУСТА им. Н. Исанова' },
  { id: 'osu', name: 'ОшГУ' },
];

const courses = [
  { id: 'frontend', name: 'Frontend разработка' },
  { id: 'backend', name: 'Backend разработка' },
  { id: 'qa', name: 'QA Engineer' },
  { id: 'uiux', name: 'UI/UX дизайн' },
];

const pluralize = (count, one, few, many) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }
  return many;
};

const CoursesPage = () => {
  const [lastPayload, setLastPayload] = useState(null);
  const [lastQualificationPayload, setLastQualificationPayload] = useState(null);

  const handleSubmit = (payload) => {
    setLastPayload(payload);
    // eslint-disable-next-line no-console
    console.log('Enrollment payload:', payload);
  };

  const handleQualificationSubmit = (payload) => {
    const normalizedPayload = {
      ...payload,
      statementFileName: payload.statementFile?.name || '',
      consentFileName: payload.consentFile?.name || '',
    };
    setLastQualificationPayload(normalizedPayload);
    // eslint-disable-next-line no-console
    console.log('Professional development payload:', normalizedPayload);
  };

  const labels = {
    title: 'Форма записи',
    universityPlaceholder: 'Выберите университет',
    coursePlaceholder: 'Выберите курс',
    studentsTitle: 'Список студентов',
    studentLabel: (index) => `Студент ${index}`,
    fullNameLabel: 'ФИО студента',
    emailLabel: 'Email студента',
    phoneLabel: 'Телефон студента',
    addStudent: 'Добавить студента',
    submit: (count) =>
      `Записать ${count} ${pluralize(count, 'студента', 'студента', 'студентов')} на курс`,
    policyText:
      'Защищено SmartCaptcha. Отправляя форму, вы подтверждаете согласие на обработку данных.',
    maxHint: (max) => `Максимальное количество студентов для записи: ${max} человек`,
    errors: {
      required: 'Поле обязательно',
      invalidEmail: 'Некорректный email',
      invalidName: 'Допустимы только буквы, пробелы и дефисы',
      invalidPhone: 'Некорректный телефон',
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h2" gutterBottom>
        Курсы
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Запись студентов на выбранные курсы.
      </Typography>

      <CourseEnrollmentForm
        universities={universities}
        courses={courses}
        maxStudents={30}
        labels={labels}
        onSubmit={handleSubmit}
      />

      {lastPayload ? (
        <Paper variant="outlined" sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            JSON-пакет для отправки
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Это то, что можно отправить на сервер в формате JSON.
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              backgroundColor: '#f7fafc',
              borderRadius: 2,
              fontSize: 14,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
            }}
          >
            {JSON.stringify(lastPayload, null, 2)}
          </Box>
        </Paper>
      ) : null}

      <Divider sx={{ my: 6 }} />

      <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Подача заявки на повышение квалификации
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Заполните форму и приложите заявление с согласием на обработку персональных данных.
      </Typography>

      <ProfessionalDevelopmentRequestForm courses={courses} onSubmit={handleQualificationSubmit} />

      {lastQualificationPayload ? (
        <Paper variant="outlined" sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            JSON-пакет по заявке на повышение квалификации
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            В payload сохранены названия файлов, готовые для отправки вместе с FormData.
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              backgroundColor: '#f7fafc',
              borderRadius: 2,
              fontSize: 14,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
            }}
          >
            {JSON.stringify(lastQualificationPayload, null, 2)}
          </Box>
        </Paper>
      ) : null}
    </Container>
  );
};

export default CoursesPage;
