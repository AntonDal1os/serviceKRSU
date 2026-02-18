import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import DocumentsPage from './pages/DocumentsPage';
import CasesPage from './pages/CasesPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import theme from './assets/styles/theme';
import './assets/styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
