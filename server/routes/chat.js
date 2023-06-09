import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import { StartNewChat , getAllChatsForUser , getMessagesForChat } from "../controllers/chat.js";
/* CREATE */
router.post("/", verifyToken, StartNewChat);

router.get("/:userId", verifyToken, getAllChatsForUser);

router.get("/:chatId/messages", verifyToken, getMessagesForChat);

export default router;