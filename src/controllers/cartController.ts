import { Request, Response } from "express";
import { Cart } from "../models/Cart";

export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  res.json(cart || { items: [] });
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].quantity = Math.max(1, cart.items[idx].quantity + Number(quantity || 1));
  } else {
    cart.items.push({ product: productId, quantity: Number(quantity || 1) });
  }

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const productId = req.params.productId;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};