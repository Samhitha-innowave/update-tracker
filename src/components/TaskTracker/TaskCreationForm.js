// ✅ TaskCreationForm.js (Artistic Dark Mode UI)
import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskCreationForm = () => {
  const {
    newTask,
    handleInputChange,
    createTask
  } = useTaskManager();

  return (
    <div className="bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 max-w-3xl mx-auto mt-4 backdrop-blur-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">📝 Add New Task</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task title"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="estimatedHours"
          min="0"
          value={newTask.estimatedHours}
          onChange={handleInputChange}
          placeholder="Hours"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />

        <input
          type="number"
          name="estimatedMinutes"
          min="0"
          value={newTask.estimatedMinutes}
          onChange={handleInputChange}
          placeholder="Minutes"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />

        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task description (optional)"
          className="col-span-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 resize-none"
          rows={3}
        ></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={createTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition shadow-md"
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCreationForm;
