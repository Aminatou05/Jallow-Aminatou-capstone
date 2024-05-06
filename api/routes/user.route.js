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

// Route for the test endpoint
router.get("/test", test);

// Route for updating a user
router.patch("/update/:id", verifyToken, updateUser);

// Route for deleting a user
router.delete("/delete/:id", verifyToken, deleteUser);

// Route for getting user listings
router.get('/listings/:id', verifyToken, getUserListings)

export default router;

