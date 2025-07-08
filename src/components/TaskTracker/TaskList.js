// src/components/TaskTracker/TaskList.js
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import { useTaskManager } from '../../hooks/useTaskManager';

const TaskList = () => {
  const { tasks, filter } = useContext(TaskContext);
  const {
    editingTaskId,
    updateTask,
    saveCompletion,
    completeTask,
    setEditingTaskId
  } = useTaskManager();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'to-do') return task.status === 'to-do' || task.status === 'pending';
    return task.status === filter;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 transition hover:shadow-2xl text-center">
        <p className="text-gray-500 text-lg">📭 No tasks to display. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          saveCompletion={saveCompletion}
          completeTask={completeTask}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      ))}
    </div>
  );
};

export default TaskList;
