// src/components/NewNote.js
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IconButton, Tooltip, MenuItem, Select, FormControl } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  TextFields
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NewNote = () => {
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('100%'); // Default size as 100%
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log('Saved content:', content);
    // Save logic here
  };

  const handlePreview = () => {
    navigate('/preview', { state: { content } });
  };

  const applyFormatting = (format) => {
    const editor = quillRef.current.getEditor();
    editor.focus();

    switch (format) {
      case 'bold':
        editor.format('bold', !editor.getFormat().bold);
        break;
      case 'italic':
        editor.format('italic', !editor.getFormat().italic);
        break;
      case 'underline':
        editor.format('underline', !editor.getFormat().underline);
        break;
      case 'code':
        editor.format('code-block', !editor.getFormat()['code-block']);
        break;
      case 'blockquote':
        editor.format('blockquote', !editor.getFormat().blockquote);
        break;
      case 'bulletedList':
        editor.format('list', editor.getFormat().list === 'bullet' ? false : 'bullet');
        break;
      case 'numberedList':
        editor.format('list', editor.getFormat().list === 'ordered' ? false : 'ordered');
        break;
      default:
        return;
    }
  };

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize);
    const editor = quillRef.current.getEditor();
    editor.format('size', newSize);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">New Note</h2>
      <div className="flex space-x-2 mb-4">
        <Tooltip title="Bold">
          <IconButton onClick={() => applyFormatting('bold')}>
            <FormatBold />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton onClick={() => applyFormatting('italic')}>
            <FormatItalic />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline">
          <IconButton onClick={() => applyFormatting('underline')}>
            <FormatUnderlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Code">
          <IconButton onClick={() => applyFormatting('code')}>
            <Code />
          </IconButton>
        </Tooltip>
        <Tooltip title="Blockquote">
          <IconButton onClick={() => applyFormatting('blockquote')}>
            <FormatQuote />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bulleted List">
          <IconButton onClick={() => applyFormatting('bulletedList')}>
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton onClick={() => applyFormatting('numberedList')}>
            <FormatListNumbered />
          </IconButton>
        </Tooltip>
        <FormControl variant="outlined">
          <Select
            value={fontSize}
            onChange={handleFontSizeChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Text Size' }}
            style={{ width: 100 }}
          >
            <MenuItem value="80%">80%</MenuItem> {/* Small */}
            <MenuItem value="100%">100%</MenuItem> {/* Normal */}
            <MenuItem value="120%">120%</MenuItem> {/* Large */}
            <MenuItem value="150%">150%</MenuItem> {/* Huge */}
          </Select>
        </FormControl>
      </div>
      <div className="flex-grow">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your note..."
          modules={{ toolbar: false }} // Disable default toolbar
          style={{ height: 'calc(100vh - 200px)', backgroundColor: 'white' }}
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Note
        </button>
        <button
          onClick={handlePreview}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default NewNote;
