import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController";
import { protect } from "../middleware/auth";

const router = express.Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Dohvata proizvode iz korisničke korpe
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista proizvoda u korpi
 */
router.get("/", protect, getCart);

/**
 * @openapi
 * /api/cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Dodaje proizvod u korpu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Proizvod dodat u korpu
 */
router.post("/", protect, addToCart);

/**
 * @openapi
 * /api/cart/{productId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Uklanja proizvod iz korpe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proizvod uklonjen iz korpe
 */
router.delete("/:productId", protect, removeFromCart);

export default router;
