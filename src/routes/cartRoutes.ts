import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController";
import { protect } from "../middleware/auth";

const router = express.Router();
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);

export default router;