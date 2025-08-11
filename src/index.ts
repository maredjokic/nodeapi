// src/index.ts
import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes';
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import { seed } from './utils/seedProducts'; // Assuming you have a utility to seed products
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
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

connectDB().then(async () => {
  await seed();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


