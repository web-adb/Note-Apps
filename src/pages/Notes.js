import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Notes = () => {
  const { noteName } = useParams(); // Get note name from URL
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes`);
        const foundNote = response.data.find(n => n.name === decodeURIComponent(noteName));
        setNote(foundNote);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [noteName]);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{note.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
      <p className="text-sm text-gray-500 mt-2">Created at: {new Date(note.created_at).toLocaleString()}</p>
    </div>
  );
};

export default Notes;
