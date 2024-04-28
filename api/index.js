import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global congiguration
const mongoURI = process.env.MONGO_URI;


// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("connected successfully to mongo");
});

// creating express application today
const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening`);
});

app.get('/' , (req , res )  => {
  res.send('Nakamu');
})
