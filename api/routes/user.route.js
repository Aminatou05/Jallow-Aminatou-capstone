import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Create a new router instance
const router = express.Router();

// route for the test endpoint
router.get("/test", test);

//route for updating a user
router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

export default router;
