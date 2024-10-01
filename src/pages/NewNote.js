import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IconButton, Tooltip, MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import {
  FormatBold, FormatItalic, FormatUnderlined, Code,
  FormatQuote, FormatListBulleted, FormatListNumbered
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const NewNote = () => {
  const location = useLocation();
  const [content, setContent] = useState(location.state?.content || ''); // Ambil konten jika ada
  const [noteName, setNoteName] = useState(location.state?.name || '');  // Ambil nama catatan jika ada
  const [fontSize, setFontSize] = useState('100%');
  const [popupVisible, setPopupVisible] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!location.state?.name); // Cek apakah ini mode edit
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Tentukan apakah dalam mode edit atau buat baru
    setIsEditMode(!!location.state?.name);
  }, [location.state?.name]);

  const handleContentChange = (value) => setContent(value);

  const handleSave = () => {
    setPopupVisible(true); // Tampilkan popup untuk input nama catatan
  };

  const confirmSave = async () => {
    if (!noteName) {
      alert('Note name is required.');
      return;
    }

    try {
      let response;
      if (isEditMode) {
        // Jika mode edit, perbarui catatan yang ada
        response = await axios.put(`http://localhost:5000/api/notes/${noteName}`, { content });
      } else {
        // Jika mode buat baru, simpan catatan baru
        response = await axios.post('http://localhost:5000/api/notes', { content, name: noteName });
      }

      if (response.status === 200 || response.status === 201) {
        // Tampilkan notifikasi sukses dan reset form
        setShowSnackbar(true);
        setPopupVisible(false); // Tutup popup setelah menyimpan
        setTimeout(() => navigate('/'), 2000); // Kembali ke halaman utama setelah 2 detik
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('An error occurred while saving the note.');
    }
  };

  const handlePreview = () => {
    navigate('/preview', { state: { content } });
  };

  const applyFormatting = (format) => {
    const editor = quillRef.current.getEditor();
    editor.focus();
    switch (format) {
      case 'bold': editor.format('bold', !editor.getFormat().bold); break;
      case 'italic': editor.format('italic', !editor.getFormat().italic); break;
      case 'underline': editor.format('underline', !editor.getFormat().underline); break;
      case 'code': editor.format('code-block', !editor.getFormat()['code-block']); break;
      case 'blockquote': editor.format('blockquote', !editor.getFormat().blockquote); break;
      case 'bulletedList': editor.format('list', editor.getFormat().list === 'bullet' ? false : 'bullet'); break;
      case 'numberedList': editor.format('list', editor.getFormat().list === 'ordered' ? false : 'ordered'); break;
      default: return;
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
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Note' : 'New Note'}</h2>
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
            <MenuItem value="80%">80%</MenuItem>
            <MenuItem value="100%">100%</MenuItem>
            <MenuItem value="120%">120%</MenuItem>
            <MenuItem value="150%">150%</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex-grow">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your note..."
          modules={{ toolbar: false }}
          style={{ height: 'calc(100vh - 200px)', backgroundColor: 'white' }}
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isEditMode ? 'Update Note' : 'Save Note'}
        </button>
        <button onClick={handlePreview} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Preview
        </button>
      </div>

      {/* Popup untuk nama catatan */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold">Enter Note Name</h3>
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
            <div className="flex justify-end mt-4">
              <button onClick={confirmSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                {isEditMode ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar untuk notifikasi sukses */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {isEditMode ? 'Note updated successfully!' : 'Note saved successfully!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewNote;
