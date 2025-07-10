// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskTracker from './components/TaskTracker';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen font-sans bg-base text-white transition-colors duration-300">
        <Router>
          <Routes>
            <Route path="/" element={<TaskTracker />} />
          </Routes>
        </Router>
      </div>
    </TaskProvider>
  );
}

export default App;
