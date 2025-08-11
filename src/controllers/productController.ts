import { Request, Response } from "express";
import { Product } from "./../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, q } = req.query as any;
  const filter: any = {};
  if (q) filter.name = { $regex: q, $options: "i" };

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Product.countDocuments(filter);
  res.json({ products, total: count, page: Number(page) });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};