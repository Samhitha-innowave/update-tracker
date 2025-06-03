// src/components/UI/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 shadow-md py-6 px-8">
      <h1 className="text-white text-3xl font-bold tracking-wide">Update Tracker</h1>
      <p className="text-blue-100 text-sm mt-1">Keep track of your assigned tasks and deadlines</p>
    </header>
  );
};

export default Header;