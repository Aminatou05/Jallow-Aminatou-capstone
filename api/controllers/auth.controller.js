import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
// import jsonwebtoken package for Authentication
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  //using bcryptjs package  to hashed  passwords in the database
  const hashedPassword = bcryptjs.hashSync(password, 10); //number of wrongs for creating salt
  //creating a new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
// creating a signin function
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //checking if the email and password exsist
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid password!"));
    //creating  a token and using  the method from JWT2 which is Sign and i want some information that is
    //  unique for the user and that wll be the ID.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // Added a secret key for the application and it can any number
    const { password: pass, ...rest } = validUser._doc;
    //  No other  third party applications should access to the cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
 //google fuction
 export const google = async (req, res, next) => {
  try {
    // Find the user in the database based on the provided email address
    const user = await User.findOne({email: req.body.email})
    if (user) {
        // Generate a JSON Web Token (JWT) for the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else{
      // Generate a random password for the new user
      const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Create a new user with the generated password and other details
    const newUser = new User({
      username:
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
     // Save the new user to the database
    await newUser.save();
    // Generate a JWT for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
} catch (error) {
  next(error);
}
};

//signout function
export const signOut = async (req, res, next) => {
  try {
      // Clear the access token cookie to log the user out
    res.clearCookie('access_token');
    // Send a 200 status response with a message indicating successful logout
    res.status(200).json({ message: 'User has been logged out!' });
  } catch (error) {
    next(error);
  }
};
 