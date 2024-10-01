import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Notes = () => {
  const { noteName } = useParams(); // Get note name from URL
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        const notes = response.data;

        if (!noteName || noteName === "latest") {
          const latestNote = notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
          navigate(`/notes/${encodeURIComponent(latestNote.name)}`);
        } else {
          const foundNote = notes.find(n => n.name === decodeURIComponent(noteName));
          setNote(foundNote);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNotes();
  }, [noteName, navigate]);

  const handleEdit = () => {
    // Arahkan ke halaman NewNote dengan state berisi konten catatan
    navigate('/new-note', { state: { content: note.content, name: note.name } });
  };

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <div className="flex items-center space-x-2">
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">{note.name}</h2>
      <div className="prose lg:prose-xl mb-4" dangerouslySetInnerHTML={{ __html: note.content }}></div>
      <p className="text-gray-500 text-sm">Created at: {new Date(note.created_at).toLocaleString()}</p>
    </div>
  );
};

export default Notes;
