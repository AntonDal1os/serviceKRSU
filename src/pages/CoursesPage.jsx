import React, { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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

const faqCategories = [
  {
    id: 'enrollment',
    label: 'Запись на курс',
    questions: [
      {
        q: 'Как записаться на курс?',
        a: 'Заполните форму записи выше и дождитесь письма с подтверждением.',
      },
      {
        q: 'Когда заканчивается набор?',
        a: 'Набор закрывается после заполнения лимита мест. Актуальный статус виден в разделе курса.',
      },
      {
        q: 'Можно ли записаться сразу на несколько курсов?',
        a: 'Да, но потребуется отдельная заявка на каждый курс.',
      },
      {
        q: 'Что делать, если не могу выбрать университет?',
        a: 'Проверьте правильность данных. Если ошибки нет, обратитесь в поддержку.',
      },
    ],
  },
  {
    id: 'testing',
    label: 'Тесты и задания',
    questions: [
      {
        q: 'Мне не доступен тест, что делать?',
        a: 'Проверьте, выполнены ли все предыдущие задания и не истек ли срок.',
      },
      {
        q: 'Можно ли пересдать тест?',
        a: 'Пересдача зависит от условий курса. Уточните у куратора.',
      },
      {
        q: 'Почему не активна кнопка отправки?',
        a: 'Убедитесь, что все обязательные поля заполнены, а файлы загружены.',
      },
      {
        q: 'Где посмотреть результаты?',
        a: 'Результаты отображаются в личном кабинете после проверки.',
      },
    ],
  },
  {
    id: 'certificates',
    label: 'Сертификаты',
    questions: [
      {
        q: 'Когда будет готов сертификат?',
        a: 'Сертификат формируется после закрытия курса и проверки итогов.',
      },
      {
        q: 'Можно ли получить сертификат в электронном виде?',
        a: 'Да, ссылка на сертификат появится в личном кабинете.',
      },
      {
        q: 'Что делать, если сертификат не отображается?',
        a: 'Проверьте, что курс завершен и выполнены все условия. При ошибке — в поддержку.',
      },
    ],
  },
  {
    id: 'technical',
    label: 'Технические вопросы',
    questions: [
      {
        q: 'Какой браузер поддерживается?',
        a: 'Рекомендуем последние версии Chrome, Edge или Firefox.',
      },
      {
        q: 'Что делать при технической ошибке?',
        a: 'Обновите страницу и попробуйте снова. Если не помогает — напишите в поддержку.',
      },
      {
        q: 'Могу ли я сменить аккаунт?',
        a: 'Да, выйдите из системы и войдите под другим аккаунтом.',
      },
    ],
  },
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
  const [faqCategoryId, setFaqCategoryId] = useState(faqCategories[0].id);
  const [faqMenuAnchor, setFaqMenuAnchor] = useState(null);

  const selectedFaqCategory = useMemo(
    () => faqCategories.find((category) => category.id === faqCategoryId) || faqCategories[0],
    [faqCategoryId],
  );

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

      <Divider sx={{ my: 6 }} />

      <Box
        sx={(theme) => ({
          borderRadius: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.2),
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
          p: { xs: 2, sm: 3 },
        })}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={1.5}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Часто задаваемые вопросы
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Категория:
              </Typography>
              <Chip label={selectedFaqCategory.label} size="small" color="primary" />
            </Stack>
          </Box>
          <IconButton
            aria-label="Выбрать категорию"
            onClick={(event) => setFaqMenuAnchor(event.currentTarget)}
            sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Stack>

        <Menu
          anchorEl={faqMenuAnchor}
          open={Boolean(faqMenuAnchor)}
          onClose={() => setFaqMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {faqCategories.map((category) => (
            <MenuItem
              key={category.id}
              selected={category.id === selectedFaqCategory.id}
              onClick={() => {
                setFaqCategoryId(category.id);
                setFaqMenuAnchor(null);
              }}
            >
              {category.label}
            </MenuItem>
          ))}
        </Menu>

        <Stack spacing={1}>
          {selectedFaqCategory.questions.map((item) => (
            <Accordion
              key={item.q}
              sx={(theme) => ({
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
              })}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default CoursesPage;
