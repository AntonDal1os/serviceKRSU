import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const defaultLabels = {
  title: 'Enrollment form',
  universityPlaceholder: 'Select university',
  coursePlaceholder: 'Select course',
  studentsTitle: 'Students list',
  studentLabel: 'Student',
  fullNameLabel: 'Full name',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  addStudent: 'Add student',
  submit: 'Enroll students',
  policyText: 'By submitting the form, you agree to data processing.',
  maxHint: 'Maximum students: {{max}}',
};

const defaultErrors = {
  required: 'Required field',
  invalidEmail: 'Invalid email format',
  invalidName: 'Use letters, spaces, or hyphens',
  invalidPhone: 'Invalid phone format',
};

const createEmptyStudent = () => ({ fullName: '', email: '', phone: '' });

const CourseEnrollmentForm = ({
  universities = [],
  courses = [],
  maxStudents = 30,
  onSubmit,
  labels: labelsProp = {},
}) => {
  const labels = { ...defaultLabels, ...labelsProp };
  const errorText = { ...defaultErrors, ...(labelsProp.errors || {}) };

  const [formValues, setFormValues] = useState({
    university: '',
    course: '',
  });
  const [students, setStudents] = useState([createEmptyStudent()]);
  const [errors, setErrors] = useState({
    university: '',
    course: '',
    students: [createEmptyStudent()],
  });

  const nameRegex = /^[\p{L}\s.'-]{2,}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9()\s-]+$/;

  const validate = (nextValues = formValues, nextStudents = students) => {
    const nextErrors = {
      university: '',
      course: '',
      students: nextStudents.map(() => ({ fullName: '', email: '', phone: '' })),
    };
    let isValid = true;

    if (!nextValues.university) {
      nextErrors.university = errorText.required;
      isValid = false;
    }

    if (!nextValues.course) {
      nextErrors.course = errorText.required;
      isValid = false;
    }

    nextStudents.forEach((student, index) => {
      const fullName = student.fullName.trim();
      const email = student.email.trim();
      const phone = student.phone.trim();

      if (!fullName) {
        nextErrors.students[index].fullName = errorText.required;
        isValid = false;
      } else if (!nameRegex.test(fullName)) {
        nextErrors.students[index].fullName = errorText.invalidName;
        isValid = false;
      }

      if (!email) {
        nextErrors.students[index].email = errorText.required;
        isValid = false;
      } else if (!emailRegex.test(email)) {
        nextErrors.students[index].email = errorText.invalidEmail;
        isValid = false;
      }

      const digitsCount = phone.replace(/\D/g, '').length;
      if (!phone) {
        nextErrors.students[index].phone = errorText.required;
        isValid = false;
      } else if (!phoneRegex.test(phone) || digitsCount < 10 || digitsCount > 15) {
        nextErrors.students[index].phone = errorText.invalidPhone;
        isValid = false;
      }
    });

    return { isValid, nextErrors };
  };

  const handleSelectChange = (field) => (event) => {
    const value = event.target.value;
    const nextValues = { ...formValues, [field]: value };
    setFormValues(nextValues);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleStudentChange = (index, field) => (event) => {
    const value = event.target.value;
    setStudents((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    if (errors.students[index]?.[field]) {
      setErrors((prev) => {
        const nextErrors = { ...prev, students: [...prev.students] };
        nextErrors.students[index] = { ...nextErrors.students[index], [field]: '' };
        return nextErrors;
      });
    }
  };

  const handleAddStudent = () => {
    if (students.length >= maxStudents) {
      return;
    }
    setStudents((prev) => [...prev, createEmptyStudent()]);
    setErrors((prev) => ({
      ...prev,
      students: [...prev.students, createEmptyStudent()],
    }));
  };

  const handleRemoveStudent = (index) => {
    if (students.length <= 1) {
      return;
    }
    setStudents((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, nextErrors } = validate();
    setErrors(nextErrors);
    if (!isValid) {
      return;
    }

    const payload = {
      universityId: formValues.university,
      courseId: formValues.course,
      students: students.map((student) => ({
        fullName: student.fullName.trim(),
        email: student.email.trim(),
        phone: student.phone.trim(),
      })),
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      // eslint-disable-next-line no-console
      console.log('Enrollment payload:', payload);
    }
  };

  const studentLabel = (index) => {
    if (typeof labels.studentLabel === 'function') {
      return labels.studentLabel(index + 1);
    }
    return `${labels.studentLabel} ${index + 1}`;
  };

  const submitLabel =
    typeof labels.submit === 'function'
      ? labels.submit(students.length)
      : labels.submit || `Enroll ${students.length} students`;

  const addLabel =
    typeof labels.addStudent === 'function'
      ? labels.addStudent(students.length, maxStudents)
      : `${labels.addStudent} (${students.length}/${maxStudents})`;

  const maxHint =
    typeof labels.maxHint === 'function'
      ? labels.maxHint(maxStudents)
      : (labels.maxHint || '').replace('{{max}}', maxStudents);

  return (
    <Container maxWidth="sm" sx={{ px: 0 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          {labels.title}
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              select
              label={labels.universityPlaceholder}
              value={formValues.university}
              onChange={handleSelectChange('university')}
              error={Boolean(errors.university)}
              helperText={errors.university}
              fullWidth
            >
              {universities.map((university) => (
                <MenuItem key={university.id} value={university.id}>
                  {university.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label={labels.coursePlaceholder}
              value={formValues.course}
              onChange={handleSelectChange('course')}
              error={Boolean(errors.course)}
              helperText={errors.course}
              fullWidth
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </TextField>

            <Divider>
              <Chip label={labels.studentsTitle} />
            </Divider>

            <Stack spacing={2}>
              {students.map((student, index) => (
                <Paper
                  key={`student-${index}`}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f7fafc',
                    borderColor: 'primary.light',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Chip label={studentLabel(index)} color="primary" size="small" />
                      <IconButton
                        aria-label="remove student"
                        onClick={() => handleRemoveStudent(index)}
                        disabled={students.length === 1}
                        size="small"
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Stack>

                    <TextField
                      label={labels.fullNameLabel}
                      value={student.fullName}
                      onChange={handleStudentChange(index, 'fullName')}
                      error={Boolean(errors.students[index]?.fullName)}
                      helperText={errors.students[index]?.fullName}
                      fullWidth
                    />

                    <TextField
                      type="email"
                      label={labels.emailLabel}
                      value={student.email}
                      onChange={handleStudentChange(index, 'email')}
                      error={Boolean(errors.students[index]?.email)}
                      helperText={errors.students[index]?.email}
                      fullWidth
                    />

                    <TextField
                      type="tel"
                      label={labels.phoneLabel}
                      value={student.phone}
                      onChange={handleStudentChange(index, 'phone')}
                      error={Boolean(errors.students[index]?.phone)}
                      helperText={errors.students[index]?.phone}
                      inputProps={{ inputMode: 'tel' }}
                      fullWidth
                    />
                  </Stack>
                </Paper>
              ))}
            </Stack>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddStudent}
              disabled={students.length >= maxStudents}
            >
              {addLabel}
            </Button>

            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 2, backgroundColor: '#f5f7fa' }}
            >
              <Typography variant="body2" color="text.secondary">
                {labels.policyText}
              </Typography>
            </Paper>

            <Button variant="contained" color="primary" type="submit" size="large">
              {submitLabel}
            </Button>

            {maxHint ? (
              <Typography variant="caption" color="text.secondary" textAlign="center">
                {maxHint}
              </Typography>
            ) : null}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CourseEnrollmentForm;
