// src/components/TaskTracker/TaskFilters.js
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const filters = [
  { label: "To Do", value: "to-do" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const TaskFilters = () => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="flex justify-center gap-4 mt-4">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition 
            ${
              filter === value
                ? "bg-white text-gray-800 border-white shadow-lg"
                : "bg-transparent text-white border-white/30 hover:border-white"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
