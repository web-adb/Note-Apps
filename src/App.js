// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Notes from './pages/Notes';
import NewNote from './pages/NewNote';
import Settings from './pages/Settings';
import Preview from './pages/Preview';
import { ThemeProvider } from './contexts/ThemeContext';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
    <Router>
      <div className="flex h-screen">
        {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        <div className="flex-grow p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:noteName" element={<Notes />} />
            <Route path="/new-note" element={<NewNote />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ThemeProvider>

  );
}

export default App;
