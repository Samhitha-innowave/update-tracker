// src/utils/timeUtils.js
export const formatTimeLeft = (timeObj) => {
  if (!timeObj) return '';
  
  const { hours, minutes, seconds } = timeObj;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const calculateTimeLeft = (startTime, estimatedHours, estimatedMinutes) => {
  const now = new Date();
  const start = new Date(startTime);
  const estimatedDuration = (estimatedHours * 60 + estimatedMinutes) * 60 * 1000;
  const endTime = new Date(start.getTime() + estimatedDuration);
  
  // Calculate time left
  const diff = endTime - now;
  
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds, isTimeUp: false };
};