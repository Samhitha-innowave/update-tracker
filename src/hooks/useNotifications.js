// src/hooks/useNotifications.js
import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

export const useNotifications = () => {
  const { notifications, setNotifications } = useContext(TaskContext);

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const createNotification = (taskId, message) => {
    const newNotification = {
      id: Date.now(),
      taskId,
      message,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Tracker', {
        body: message,
        icon: '/favicon.ico'
      });
    }
    
    return newNotification;
  };

  return {
    notifications,
    dismissNotification,
    markAllAsRead,
    clearAllNotifications,
    createNotification
  };
};