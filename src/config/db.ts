import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'local';

const MONGO_URI =
  env === 'docker'
    ? process.env.DOCKER_MONGO_URI
    : process.env.LOCAL_MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) throw new Error('Mongo URI not defined');
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};