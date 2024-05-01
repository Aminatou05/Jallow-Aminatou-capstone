import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
// authentication route for SignUp
const router = express.Router();

//signup route
router.post("/signup", signup)

//signin route
router.post("/signin", signin);



export default router;
