<<<<<<< HEAD
import express from 'express'
import { isAuth } from '../middlewares/isAuth.js';
import { addConversation, createChat, deleteChat, getAllChats, getConversation } from '../controllers/chatControllers.js';
=======
import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  addConversation,
  createChat,
  deleteChat,
  getAllChats,
  getConversation,
} from "../controllers/chatControllers.js";
>>>>>>> parent of 94afc1c (chnages)

const router = express.Router();

router.post("/new", isAuth, createChat);
<<<<<<< HEAD
router.get("/all",isAuth, getAllChats);
router.post("/id", isAuth, addConversation);
router.get("/id", isAuth, getConversation);
router.delete("/id", isAuth, deleteChat);

=======
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);
>>>>>>> parent of 94afc1c (chnages)

export default router;