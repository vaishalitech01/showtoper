import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './database/ConnectDB.js';
import formRoutes from './routes/formRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

ConnectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/forms', formRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});