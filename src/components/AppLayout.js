// src/components/AppLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import NewNote from './NewNote';
import { Routes, Route } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route path="/new-note" element={<NewNote />} />
          {/* Other routes can be added here */}
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
