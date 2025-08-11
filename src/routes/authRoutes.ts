import express from "express";
import { register, login, getProfile, logout } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registracija korisnika
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Uspešna registracija
 */
router.post("/register", register);

router.post("/login", login);
router.get("/me", protect, getProfile);
router.post("/logout", logout);

export default router;  