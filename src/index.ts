// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

