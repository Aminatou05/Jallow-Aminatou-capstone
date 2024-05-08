import express from "express";
import { createAgent } from "../controllers/agent.controller.js";


const router = express.Router();

router.get('/create', createAgent )

export default router;