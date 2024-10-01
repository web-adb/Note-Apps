import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);  // State untuk modal konfirmasi
  const [selectedNoteId, setSelectedNoteId] = useState(null);  // State untuk ID catatan yang akan dihapus

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${selectedNoteId}`);
      setNotes(notes.filter((note) => note.id !== selectedNoteId));
      setOpen(false); // Tutup modal setelah catatan dihapus
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleClickOpen = (id) => {
    setSelectedNoteId(id);  // Simpan ID catatan yang dipilih
    setOpen(true);  // Buka modal konfirmasi
  };

  const handleClose = () => {
    setOpen(false);  // Tutup modal tanpa menghapus
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available. Please add some.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="border p-4 rounded shadow flex justify-between items-center">
              <Link to={`/notes/${encodeURIComponent(note.name)}`} className="flex-1">
                <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
                <p className="text-sm text-gray-500 mt-2">Created at: {new Date(note.created_at).toLocaleString()}</p>
              </Link>
              <IconButton onClick={() => handleClickOpen(note.id)} aria-label="delete" color="secondary">
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Link to="/new-note" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add New Note
        </Link>
      </div>

      {/* Modal konfirmasi */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Note"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
