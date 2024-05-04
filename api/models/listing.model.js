import mongoose from 'mongoose';

//schema for listings
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {   // Indicates if parking is available with the listing
      type: Boolean,
      required: true,
    },
    type: {     // Type of the listing (e.g., apartment, house)
      type: String,
      required: true,
    },
    offer: {    // Indicates if there is an offer or discount on the listing
      type: Boolean,
      required: true,
    },
    imageUrls: {   // Array of image URLs for the listing
      type: Array,
      required: true,
    },
    userRef: {        // Reference to the user who owns the listing
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const Listing = mongoose.model('Listing', listingSchema);

export default Listing;