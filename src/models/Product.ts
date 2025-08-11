import mongoose, { Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  category: String,
  countInStock: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>("Product", productSchema);