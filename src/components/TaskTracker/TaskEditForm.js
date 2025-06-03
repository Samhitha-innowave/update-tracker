// src/components/TaskTracker/TaskEditForm.js
import React from 'react';
import { CheckSquare, Save } from 'lucide-react';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskEditForm = ({ task }) => {
  const { updateTask, setEditingTaskId, saveCompletion } = useTaskManager();

  const handleInputChange = (field, value) => {
    updateTask(task.id, { [field]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={task.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows="2"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Est. Hours
          </label>
          <input
            type="number"
            min="0"
            value={task.estimatedHours}
            onChange={(e) => handleInputChange('estimatedHours', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Est. Minutes
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={task.estimatedMinutes}
            onChange={(e) => handleInputChange('estimatedMinutes', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      
      {task.status === 'in-progress' || task.status === 'completed' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job ID
            </label>
            <input
              type="text"
              value={task.jobId || ''}
              onChange={(e) => handleInputChange('jobId', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter job ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Execution Link
            </label>
            <input
              type="text"
              value={task.executionLink || ''}
              onChange={(e) => handleInputChange('executionLink', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter execution link"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Completion Notes
            </label>
            <textarea
              value={task.completionNotes || ''}
              onChange={(e) => handleInputChange('completionNotes', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              placeholder="Add any completion notes or details"
            ></textarea>
          </div>
        </div>
      ) : null}
      
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setEditingTaskId(null)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        {task.status === 'in-progress' && (
          <button
            onClick={() => saveCompletion(task.id)}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
          >
            <CheckSquare className="w-4 h-4 mr-1" />
            Mark Complete
          </button>
        )}
        <button
          onClick={() => setEditingTaskId(null)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <Save className="w-4 h-4 mr-1" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TaskEditForm;