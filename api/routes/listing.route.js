import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

import express from "express";

const router = express.Router();

// Route to create a new listing
router.post('/create', verifyToken, createListing);

// Route to delete a listing
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
