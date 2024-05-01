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
