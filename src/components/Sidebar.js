// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Note, Settings, Add, MenuOpen } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  return (
    <div className="sidebar w-64 h-full bg-gradient-to-r from-gray-800 to-gray-900 text-white border-r flex flex-col justify-between">
      <div>
        <div className="header p-4 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h1 className="text-xl font-bold">Take Note</h1>
        </div>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/notes">
            <ListItemIcon>
              <Note className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button component={Link} to="/new-note">
            <ListItemIcon>
              <Add className="text-white" />
            </ListItemIcon>
            <ListItemText primary="New Note" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <Settings className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
      <div className="p-4">
        <IconButton onClick={toggleSidebar} className="text-white">
          <MenuOpen />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
