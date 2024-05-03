import express from "express";
import { google, signOut, signin, signup } from "../controllers/auth.controller.js";
// authentication route for SignUp
const router = express.Router();

//signup route
router.post("/signup", signup)

//signin route
router.post("/signin", signin);

//google route
router.post('/google', google);
//signout route
router.get('/signout', signOut);



export default router;
