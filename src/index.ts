// src/index.ts
import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes';
import cors from "cors";
// import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "*",// "http://localhost:5173",
  credentials: false // true
}));

const PORT = process.env.PORT || 5000;

app.use('/api/users', authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


