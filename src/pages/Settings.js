// src/pages/Settings.js
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography } from '@mui/material';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <div className="space-y-4">
      <Typography variant="h4" gutterBottom>
        Settings Page
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={<Switch checked={theme === 'dark'} onChange={toggleTheme} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Font Settings
          </Typography>
          <FormControl variant="outlined" className="w-64">
            <InputLabel>Font Size</InputLabel>
            <Select value={fontSize} onChange={handleFontSizeChange} label="Font Size">
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
