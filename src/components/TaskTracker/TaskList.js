// src/components/TaskTracker/TaskList.js
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskEditForm from './TaskEditForm';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskList = () => {
  const { tasks, filter } = useContext(TaskContext);
  const { editingTaskId } = useTaskManager();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500">No tasks to display. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
          {editingTaskId === task.id ? (
            <TaskEditForm task={task} />
          ) : (
            <TaskItem task={task} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;