// src/contexts/TaskContext.js
import { createContext, useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/localStorage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      tasks.forEach(task => {
        if (task.status === 'in-progress' && task.startedAt) {
          const startTime = new Date(task.startedAt);
          const estimatedDuration = (task.estimatedHours * 60 + task.estimatedMinutes) * 60 * 1000;
          const endTime = new Date(startTime.getTime() + estimatedDuration);
          
          const diff = endTime - now;
          
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            setTimeLeft(prev => ({
              ...prev,
              [task.id]: { hours, minutes, seconds }
            }));
          } else if (diff <= 0 && !notifications.some(n => n.taskId === task.id)) {
            const newNotification = {
              id: Date.now(),
              taskId: task.id,
              message: `Time's up for task: ${task.title}`,
              createdAt: new Date().toISOString(),
              isRead: false
            };
            
            setNotifications(prev => [...prev, newNotification]);
            
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Task Time Alert', {
                body: `Time's up for your task: ${task.title}`,
                icon: '/favicon.ico'
              });
            }
          }
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tasks, notifications]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const value = {
    tasks,
    setTasks,
    filter,
    setFilter,
    notifications,
    setNotifications,
    timeLeft
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
