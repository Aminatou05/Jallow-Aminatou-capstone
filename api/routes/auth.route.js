import express from "express";
import { signup } from "../controllers/auth.controller.js";
// authentication route for SignUp
const router = express.Router();

//signup route
router.post("/signup", signup)



export default router;
