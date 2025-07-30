import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const CONNECTION_URI = process.env.MONGO_URI;

mongoose.connect(CONNECTION_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('DB Connection Error:', err.message));

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
