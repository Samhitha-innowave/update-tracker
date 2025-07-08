// src/components/TaskTracker/TaskFilters.js
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const TaskFilters = () => {
  const { filter, setFilter } = useContext(TaskContext);
  const filters = ['to-do', 'in-progress', 'completed'];

  return (
    <div className="mb-4 flex justify-center gap-3">
      {filters.map(type => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
