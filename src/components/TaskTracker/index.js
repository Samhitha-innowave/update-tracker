// src/components/TaskTracker/index.js
import React from 'react';
import { TaskProvider } from '../../contexts/TaskContext';
import TaskCreationForm from './TaskCreationForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import NotificationArea from './NotificationArea';

const TaskTracker = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        <main className="container mx-auto p-4 flex-grow">
          <NotificationArea />
          <TaskCreationForm />
          <TaskFilters />
          <TaskList />
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 dark:text-gray-400 p-4 text-center text-sm border-t border-gray-200 dark:border-gray-700">
          <p>Update Tracker - Keep track of your assigned tasks</p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default TaskTracker;
