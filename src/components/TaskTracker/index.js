// src/components/TaskTracker/index.js
import React from 'react';
import TaskCreationForm from './TaskCreationForm';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import NotificationArea from './NotificationArea';

const TaskTracker = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-8 relative overflow-hidden">

      {/* Blurred floating glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-2xl animate-pulse"></div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white drop-shadow-lg">
            Update Tracker
          </h1>
          <p className="mt-2 text-gray-300 text-sm sm:text-base">
            Keep track of your assigned tasks and priorities beautifully
          </p>
        </header>

        {/* Notification & Main UI */}
        <main className="space-y-10">
          <NotificationArea />

          <div className="backdrop-blur-md bg-glass border border-white/10 shadow-xl rounded-xl p-6 sm:p-8">
            <TaskCreationForm />
            <TaskFilters />
          </div>

          <div className="mt-6">
            <TaskList />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-400">
          <p>Designed with ❤️ using Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default TaskTracker;
