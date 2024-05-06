import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';


// Delete a listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//deleting listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {

    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));

  } 
      try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!" );
      } catch (error) {
        next(error);
      }
      };

      // Update a listing by ID
      export const updateListing = async (req, res, next) => {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
          return next(errorHandler(404, 'Listing not found!'));
        }
        if (req.user.id !== listing.userRef) {
          return next(errorHandler(401, 'You can only update your own listings!'));
        }
      
        try {
          const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
          res.status(200).json(updatedListing);
        } catch (error) {
          next(error);
        }
      };
      
      ///getListing
      export const getListing = async (req, res, next) => {
        try {
          const listing = await Listing.findById(req.params.id);
          if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
          }
          res.status(200).json(listing);
        } catch (error) {
          next(error);
        }
      };
//get listings function
      export const getListings = async (req, res, next) => {
        try {
          // Parse query parameters or use default values
          const limit = parseInt(req.query.limit) || 9;
          const startIndex = parseInt(req.query.startIndex) || 0;
      
          // Parse offer query parameter or set default filter
          let offer = req.query.offer;
          if (offer === undefined || offer === "false") {
            offer = { $in: [false, true]};
          }
      
          // Parse furnished query parameter or set default filter
          let furnished = req.query.furnished;
          if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
          }
      
          // Parse parking query parameter or set default filter
          let parking = req.query.parking;
          if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
          }
      
          // Parse type query parameter or set default filter
          let type = req.query.type;
          if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
          }
      
          // Parse searchTerm query parameter or set default value
          const searchTerm = req.query.searchTerm || '';
      
          // Parse sort and order query parameters or set default values
          const sort = req.query.sort || 'createdAt';
          const order = req.query.order || 'desc';
      
          // Query the database for listings based on filters and search term
          const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
          }).sort(
            {[sort]: order}
          ).limit(limit).skip(startIndex);
      
          // Return the listings as JSON response
          return res.status(200).json(listings);
        } catch (error) {
          // Pass any errors to the error-handling middleware
          next(error);
        }
      }
      