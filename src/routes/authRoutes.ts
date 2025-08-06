import express from "express";
import { register, login, getProfile, logout } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.post("/logout", logout);

export default router;