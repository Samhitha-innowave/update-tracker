// src/components/UI/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 shadow-md px-8 py-6 flex items-center justify-between relative">
      <div>
        <h1 className="text-white text-3xl font-bold tracking-wide">Update Tracker</h1>
        <p className="text-blue-100 text-sm mt-1">Keep track of your assigned tasks and deadlines</p>
      </div>

      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white text-lg shadow-sm"
        title="Toggle Theme"
      >
        🌓
      </button>
    </header>
  );
};

export default Header;
