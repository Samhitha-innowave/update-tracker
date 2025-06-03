// src/components/TaskTracker/TaskFilters.js
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const TaskFilters = () => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => setFilter('all')}
        className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter('in-progress')}
        className={`px-3 py-1 rounded ${filter === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        In Progress
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilters;