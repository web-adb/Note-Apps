require('dotenv').config();
const express = require('express');
const mysql = require('mysql2'); // Menggunakan mysql2 untuk dukungan promosi
const path = require('path');

const app = express();
app.use(express.json());

// Koneksi ke MySQL tanpa menentukan database terlebih dahulu
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2024',
});

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Your existing code...


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');

    // Buat database jika belum ada
    db.query('CREATE DATABASE IF NOT EXISTS database_catatan', (err) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created or exists');

        // Gunakan database yang baru dibuat atau sudah ada
        db.query('USE database_catatan', (err) => {
          if (err) {
            console.error('Error using database:', err);
          } else {
            console.log('Using database_catatan');

            // Buat tabel jika belum ada
            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),  
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              );
            `;
            db.query(createTableQuery, (err) => {
              if (err) {
                console.error('Error creating table:', err);
              } else {
                console.log('Table "notes" created or exists');
              }
            });
          }
        });
      }
    });
  }
});

// Endpoint untuk menyimpan catatan
app.post('/api/notes', (req, res) => {
    const { content, name } = req.body;
    const query = 'INSERT INTO notes (content, name) VALUES (?, ?)';
  
    db.query(query, [content, name], (err) => {
      if (err) {
        console.error('Error saving note:', err);
        res.status(500).send('Error saving note');
      } else {
        res.status(201).send('Note saved successfully');
      }
    });
  });
  

// Endpoint untuk mendapatkan semua catatan
app.get('/api/notes', (req, res) => {
  const query = 'SELECT * FROM notes ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).send('Error fetching notes');
    } else {
      res.json(results);
    }
  });
});

// Endpoint untuk menghapus catatan berdasarkan ID
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const query = 'DELETE FROM notes WHERE id = ?';
  
    db.query(query, [noteId], (err, result) => {
      if (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Error deleting note');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Note not found');
      } else {
        res.status(200).send('Note deleted successfully');
      }
    });
  });
  

// Serve frontend React build files (jika sudah build React)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler untuk menangani semua rute lainnya dan mengarahkan ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Jalankan server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
