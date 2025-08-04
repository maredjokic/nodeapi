// src/index.ts
import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


