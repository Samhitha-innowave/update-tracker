// src/hooks/useTaskManager.js
import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';

export const useTaskManager = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ title: '', estimate: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = () => {
    if (!newTask.title.trim() || !newTask.estimate.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      estimate: newTask.estimate.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      completedAt: null,
      details: null,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask({ title: '', estimate: '' });
  };

  const startTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: 'in-progress' } : task))
    );
  };

  const completeTask = (id) => {
    setEditingTaskId(id); // ✅ FIXED: now properly declared and used
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'completed', completedAt: new Date().toISOString() } : task
      )
    );
  };

  const saveCompletion = (id, details) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, details } : task))
    );
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    setEditingTaskId(id);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setEditingTaskId(null);
  };

  return {
    tasks,
    newTask,
    editingTaskId,
    handleInputChange,
    createTask,
    startTask,
    completeTask,
    saveCompletion,
    deleteTask,
    editTask,
    updateTask,
    setEditingTaskId, // ✅ MUST be included in return
  };
};
