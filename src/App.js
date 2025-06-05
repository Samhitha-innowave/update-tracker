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
      <div className="min-h-screen bg-gray-100 text-center p-10">
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