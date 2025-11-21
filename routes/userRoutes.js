<<<<<<< HEAD
import express, { Router } from "express";
import { loginUser, myProfile, verifyUser } from '../controllers/userControllers.js';
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router()

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me",isAuth,myProfile)
=======
import express from "express";
import {
  loginUser,
  myProfile,
  verifyUser,
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);
>>>>>>> parent of 94afc1c (chnages)

export default router;