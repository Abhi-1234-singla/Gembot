import express, { Router } from "express";
import { loginUser } from '../controllers/userControllers.js';

const router = express.Router()

router.post("/login", loginUser);

export default router;