import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
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
  const handleSubmit = (payload) => {
    // eslint-disable-next-line no-console
    console.log('Enrollment payload:', payload);
  };

  const handleQualificationSubmit = (payload) => {
    const normalizedPayload = {
      ...payload,
      statementFileName: payload.statementFile?.name || '',
      consentFileName: payload.consentFile?.name || '',
    };
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

      <Divider sx={{ my: 6 }} />

      <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Подача заявки на повышение квалификации
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Заполните форму и приложите заявление с согласием на обработку персональных данных.
      </Typography>

      <ProfessionalDevelopmentRequestForm courses={courses} onSubmit={handleQualificationSubmit} />
    </Container>
  );
};

export default CoursesPage;
