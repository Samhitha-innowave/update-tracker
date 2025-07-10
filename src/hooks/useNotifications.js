// src/hooks/useNotifications.js
import { useCallback } from 'react';

export const useNotifications = () => {
  const notify = useCallback((message) => {
    const notif = document.createElement('div');
    notif.className =
      'fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-slideIn';
    notif.innerText = message;

    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      setTimeout(() => notif.remove(), 500);
    }, 4000);
  }, []);

  return { notify };
};
