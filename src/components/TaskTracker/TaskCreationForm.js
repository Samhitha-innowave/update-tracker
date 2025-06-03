// src/components/TaskTracker/TaskCreationForm.js
import React from 'react';
import { Plus } from 'lucide-react';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskCreationForm = () => {
  const { newTask, handleInputChange, createTask } = useTaskManager();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2 text-blue-500" />
        Create New Task
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Est. Hours
            </label>
            <input
              type="number"
              name="estimatedHours"
              min="0"
              value={newTask.estimatedHours}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Est. Minutes
            </label>
            <input
              type="number"
              name="estimatedMinutes"
              min="0"
              max="59"
              value={newTask.estimatedMinutes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Enter task description"
          rows="3"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      
      <button
        onClick={createTask}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </button>
    </div>
  );
};

export default TaskCreationForm;