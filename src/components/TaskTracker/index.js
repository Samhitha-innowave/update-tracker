// src/components/TaskTracker/index.js
import React from 'react';
import { TaskProvider } from '../../contexts/TaskContext';
// import Header from '../UI/Header';
import TaskCreationForm from './TaskCreationForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import NotificationArea from './NotificationArea';

const TaskTracker = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        
        <main className="container mx-auto p-4 flex-grow">
          <NotificationArea />
          <TaskCreationForm />
          <TaskFilters />
          <TaskList />
        </main>

        <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          <p>Update Tracker - Keep track of your assigned tasks</p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default TaskTracker;