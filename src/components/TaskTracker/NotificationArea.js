// src/components/TaskTracker/NotificationArea.js
import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationArea = () => {
  const { notifications = [] } = useNotifications(); // fallback if undefined

  if (!notifications.length) return null;

  return (
    <div className="space-y-2">
      {notifications.map((msg, i) => (
        <div key={i} className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default NotificationArea;
