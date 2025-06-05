// src/hooks/useTaskManager.js
import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';

export const useTaskManager = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    estimatedHours: 1,
    estimatedMinutes: 0,
    status: 'pending',
    createdAt: null,
    startedAt: null,
    completedAt: null,
    jobId: '',
    executionLink: '',
    completionNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const createTask = () => {
    if (!newTask.title.trim()) return;
    
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      estimatedHours: 1,
      estimatedMinutes: 0,
      status: 'pending',
      createdAt: null,
      startedAt: null,
      completedAt: null,
      jobId: '',
      executionLink: '',
      completionNotes: ''
    });
  };

  const startTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'in-progress', startedAt: new Date().toISOString() } 
        : task
    ));
  };

  const completeTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const saveCompletion = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'completed', 
            completedAt: new Date().toISOString() 
          } 
        : task
    ));
    setEditingTaskId(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
    }
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedFields } 
        : task
    ));
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
    setEditingTaskId
  };
};