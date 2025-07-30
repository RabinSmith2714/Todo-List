import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const CONNECTION_URI = `mongodb+srv://rabinsmith:4m3z9adnbw5d7Y9C@todo.ytjw4op.mongodb.net/tododb?retryWrites=true&w=majority&appName=todo`;

mongoose.connect(CONNECTION_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('DB Connection Error:', err.message));

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
