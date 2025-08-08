import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN as any
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const user = await User.create({ email, password });
  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(201).json({ id: user._id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }) as IUser;
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ id: user._id, email: user.email });
};

export const getProfile = async (req: Request, res: Response) => {
  res.status(200).json((req as any).user);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" });
};