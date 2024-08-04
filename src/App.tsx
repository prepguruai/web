import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ContestPage from './pages/Contest';
import ArticlePage from './pages/Article';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contest" element={<ContestPage  />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
