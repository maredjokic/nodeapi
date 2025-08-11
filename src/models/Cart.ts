import mongoose, { Document, Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}
const cartItemSchema = new mongoose.Schema<ICartItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
},
 { _id: false },
);

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model<ICart>("Cart", cartSchema);