import express from "express";
import { getProducts, getProductById } from "../controllers/productController";

const router = express.Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lista svih proizvoda
 *     responses:
 *       200:
 *         description: Lista proizvoda
 */
router.get("/", getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Dohvata jedan proizvod po ID-u
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalji proizvoda
 *       404:
 *         description: Proizvod nije pronađen
 */
router.get("/:id", getProductById);

export default router;
