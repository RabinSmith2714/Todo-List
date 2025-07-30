import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const CONNECTION_URI = `mongodb+srv://rabinsmith:4m3z9adnbw5d7Y9C@todo.ytjw4op.mongodb.net/tododb?retryWrites=true&w=majority&appName=todo`;

mongoose.connect(CONNECTION_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('DB Connection Error:', err.message));

// API Routes
app.use('/api/todos', todoRoutes);

// --- Serve React Vite Build ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
