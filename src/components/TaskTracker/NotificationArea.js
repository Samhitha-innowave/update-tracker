// src/components/TaskTracker/NotificationArea.js
import React from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationArea = () => {
  const { notifications, dismissNotification, markAllAsRead } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
          Notifications ({notifications.length})
        </h2>
        <button 
          onClick={markAllAsRead}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Mark all as read
        </button>
      </div>
      <ul className="space-y-2">
        {notifications.map(notification => (
          <li 
            key={notification.id} 
            className={`flex justify-between items-center p-2 rounded ${notification.isRead ? 'bg-gray-50' : 'bg-white'}`}
          >
            <span className={notification.isRead ? 'text-gray-500' : 'font-medium'}>
              {notification.message}
            </span>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationArea;