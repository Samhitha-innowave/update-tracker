// src/components/TaskTracker/TaskCreationForm.js
import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskCreationForm = () => {
  const { newTask, handleInputChange, createTask } = useTaskManager();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task title"
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Short description"
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Estimated Time
      </label>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="estimatedHours"
          value={newTask.estimatedHours}
          onChange={handleInputChange}
          placeholder="Hours"
          min="0"
          className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          name="estimatedMinutes"
          value={newTask.estimatedMinutes}
          onChange={handleInputChange}
          placeholder="Minutes"
          min="0"
          className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>


      <div className="text-right">
        <button
          onClick={createTask}
          className="inline-block bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCreationForm;
