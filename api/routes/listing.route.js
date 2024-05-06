import { createListing, deleteListing , updateListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

import express from "express";

const router = express.Router();

// Route to create a new listing
router.post('/create', verifyToken, createListing);

// Route to delete a listing
router.delete('/delete/:id', verifyToken, deleteListing);

// Route to update a listing
router.post('/update/:id', verifyToken, updateListing);

export default router;
