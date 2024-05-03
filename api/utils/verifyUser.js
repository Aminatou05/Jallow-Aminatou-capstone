
import jwt from 'jsonwebtoken'; // Import the jwt library for working with JSON Web Tokens
import { errorHandler } from './error.js';
 // Middleware function to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

// If token is not present, return an error response
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // Verify the token using the JWT_SECRET from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
// If verification is successful, attach the user object to the request
    req.user = user;
      // Call the next middleware in the stack
    next();
  });
};