import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, message: 'API and database are connected.' });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles ORDER BY id LIMIT 1');
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY featured DESC, id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/experience', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experiences ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/education', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM education ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
