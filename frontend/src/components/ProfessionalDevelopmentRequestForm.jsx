import React, { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const defaultLabels = {
  title: 'Форма заявки',
  courseLabel: 'Курс',
  coursePlaceholder: 'Выберите программу',
  personalDataTitle: 'Личные данные',
  documentsTitle: 'Документы',
  fullNameLabel: 'ФИО',
  emailLabel: 'Email',
  phoneLabel: 'Телефон',
  statementTitle: '1. Заполненное заявление на повышение квалификации',
  statementButton: 'Загрузить заявление',
  consentTitle: '2. Согласие на обработку персональных данных',
  consentButton: 'Загрузить согласие',
  replaceFile: 'Выбрать другой файл',
  removeFile: 'Удалить файл',
  supportedFormats: 'Поддерживаемые форматы: .doc, .docx, .pdf',
  policyText:
    'Защищено SmartCaptcha. Отправляя форму, вы подтверждаете, что ознакомлены с обработкой данных.',
  submit: 'Отправить заявку',
  success: 'Заявка успешно подготовлена.',
};

const defaultErrors = {
  required: 'Поле обязательно',
  invalidName: 'Введите корректное ФИО',
  invalidEmail: 'Введите корректный email',

  invalidPhone: 'Введите корректный телефон',
  invalidFile: 'Допустимы только файлы .doc, .docx и .pdf',
};

const createInitialValues = () => ({
  course: '',
  fullName: '',
  email: '',
  phone: '',
  statementFile: null,
  consentFile: null,
});

const createInitialErrors = () => ({
  course: '',
  fullName: '',
  email: '',
  phone: '',
  statementFile: '',
  consentFile: '',
});

const allowedExtensions = ['doc', 'docx', 'pdf'];
const phoneAllowedCharsRegex = /^\+?[0-9()\s-]+$/;
const cisDialingCodes = ['7', '374', '994', '375', '996', '992', '998', '993', '373'];


const hasAllowedFileExtension = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return Boolean(extension) && allowedExtensions.includes(extension);
};


const normalizePhoneDigits = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) {
    // Common local notation for Russia/Kazakhstan.
    return `7${digits.slice(1)}`;
  }
  return digits;
};

const isValidCisPhone = (value) => {
  if (!phoneAllowedCharsRegex.test(value)) {
    return false;
  }

  const digits = normalizePhoneDigits(value);
  if (digits.length < 10 || digits.length > 15) {
    return false;
  }

  return cisDialingCodes.some((code) => digits.startsWith(code));
};


const ProfessionalDevelopmentRequestForm = ({
  courses = [],
  onSubmit,
  labels: labelsProp = {},
}) => {
  const labels = { ...defaultLabels, ...labelsProp };
  const errorText = { ...defaultErrors, ...(labelsProp.errors || {}) };

  const [values, setValues] = useState(createInitialValues());
  const [errors, setErrors] = useState(createInitialErrors());
  const [showSuccess, setShowSuccess] = useState(false);

  const statementInputRef = useRef(null);
  const consentInputRef = useRef(null);

  const nameRegex = /^[\p{L}\s.'-]{2,}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phoneRegex = /^\+?[0-9()\s-]+$/;


  const validate = (nextValues = values) => {
    const nextErrors = createInitialErrors();
    let isValid = true;

    const fullName = nextValues.fullName.trim();
    const email = nextValues.email.trim();
    const phone = nextValues.phone.trim();

    const digitsCount = phone.replace(/\D/g, '').length;


    if (!nextValues.course) {
      nextErrors.course = errorText.required;
      isValid = false;
    }

    if (!fullName) {
      nextErrors.fullName = errorText.required;
      isValid = false;
    } else if (!nameRegex.test(fullName)) {
      nextErrors.fullName = errorText.invalidName;
      isValid = false;
    }

    if (!email) {
      nextErrors.email = errorText.required;
      isValid = false;
    } else if (!emailRegex.test(email)) {
      nextErrors.email = errorText.invalidEmail;
      isValid = false;
    }

    if (!phone) {
      nextErrors.phone = errorText.required;
      isValid = false;

    } else if (!isValidCisPhone(phone) || !phoneRegex.test(phone) || digitsCount < 10 || digitsCount > 15) {
      nextErrors.phone = errorText.invalidPhone;
      isValid = false;
    }

    if (!nextValues.statementFile) {
      nextErrors.statementFile = errorText.required;
      isValid = false;
    } else if (!hasAllowedFileExtension(nextValues.statementFile.name)) {
      nextErrors.statementFile = errorText.invalidFile;
      isValid = false;
    }

    if (!nextValues.consentFile) {
      nextErrors.consentFile = errorText.required;
      isValid = false;
    } else if (!hasAllowedFileExtension(nextValues.consentFile.name)) {
      nextErrors.consentFile = errorText.invalidFile;
      isValid = false;
    }

    return { isValid, nextErrors };
  };

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    setShowSuccess(false);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (field) => (event) => {
    const file = event.target.files?.[0] || null;
    setValues((prev) => ({ ...prev, [field]: file }));
    setShowSuccess(false);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileRemove = (field, inputRef) => () => {
    setValues((prev) => ({ ...prev, [field]: null }));
    setShowSuccess(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const resetFileInputs = () => {
    if (statementInputRef.current) {
      statementInputRef.current.value = '';
    }
    if (consentInputRef.current) {
      consentInputRef.current.value = '';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, nextErrors } = validate();
    setErrors(nextErrors);

    if (!isValid) {
      return;
    }

    const payload = {
      courseId: values.course,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      statementFile: values.statementFile,
      consentFile: values.consentFile,
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      // eslint-disable-next-line no-console
      console.log('Professional development payload:', payload);
    }

    setValues(createInitialValues());
    setErrors(createInitialErrors());
    setShowSuccess(true);
    resetFileInputs();
  };

  const renderUploadField = ({
    title,
    buttonLabel,
    field,
    file,
    error,
    inputRef,
  }) => (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
        {title}
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          borderStyle: 'dashed',
          borderColor: error ? 'error.main' : 'primary.light',
          backgroundColor: '#f7faff',
        }}
      >
        <Button
          component="label"
          color="primary"
          startIcon={<CloudUploadOutlinedIcon />}
          sx={{ fontWeight: 600 }}
        >
          {file ? labels.replaceFile : buttonLabel}
          <input
            ref={inputRef}
            hidden
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleFileChange(field)}
          />
        </Button>
        {file ? (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mt: 1 }}
          >
            <Typography variant="body2">
              {file.name}
            </Typography>
            <IconButton
              type="button"
              color="error"
              size="small"
              aria-label={labels.removeFile}
              title={labels.removeFile}
              onClick={handleFileRemove(field, inputRef)}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : null}
      </Paper>

      {error ? (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {error}
        </Typography>
      ) : null}
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ px: 0 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
          {labels.title}
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {showSuccess ? <Alert severity="info">{labels.success}</Alert> : null}

            <TextField
              select
              label={labels.courseLabel}
              value={values.course}
              onChange={handleFieldChange('course')}
              error={Boolean(errors.course)}
              helperText={errors.course}
              fullWidth
            >
              <MenuItem value="">
                <em>{labels.coursePlaceholder}</em>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </TextField>

            <Divider>
              <Chip label={labels.personalDataTitle} />
            </Divider>

            <TextField
              label={labels.fullNameLabel}
              value={values.fullName}
              onChange={handleFieldChange('fullName')}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              fullWidth
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="email"
                  label={labels.emailLabel}
                  value={values.email}
                  onChange={handleFieldChange('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="tel"
                  label={labels.phoneLabel}
                  value={values.phone}
                  onChange={handleFieldChange('phone')}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  inputProps={{ inputMode: 'tel' }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Divider>
              <Chip label={labels.documentsTitle} />
            </Divider>

            {renderUploadField({
              title: labels.statementTitle,
              buttonLabel: labels.statementButton,
              field: 'statementFile',
              file: values.statementFile,
              error: errors.statementFile,
              inputRef: statementInputRef,
            })}

            {renderUploadField({
              title: labels.consentTitle,
              buttonLabel: labels.consentButton,
              field: 'consentFile',
              file: values.consentFile,
              error: errors.consentFile,
              inputRef: consentInputRef,
            })}

            <Typography variant="caption" color="text.secondary">
              {labels.supportedFormats}
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, backgroundColor: '#f5f7fa' }}>
              <Typography variant="body2" color="text.secondary">
                {labels.policyText}
              </Typography>
            </Paper>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #3d5a80 0%, #003366 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #2d486e 0%, #00264d 100%)',
                },
              }}
            >
              {labels.submit}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfessionalDevelopmentRequestForm;
