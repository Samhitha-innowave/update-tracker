// ✅ App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskTracker from './components/TaskTracker';
import Header from './components/UI/Header';
import { TaskProvider } from './contexts/TaskContext';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 font-sans">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<TaskTracker />} />
          </Routes>
        </Router>
      </div>
    </TaskProvider>
  );
}

export default App;