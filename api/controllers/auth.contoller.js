import express from "express";
import {signup} from '../controllers/auth.controller.js';
 // creating authentication for the SignUp page
const router = express.Router();


router.post("/signup", signup)
  
  