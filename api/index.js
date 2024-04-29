import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';

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


// ================ Routes ================
app.use('/api/user', userRouter);

// app.get('/test', (req, res) => {
//   res.send('Nakamu')
// })










app.listen(PORT, () => {
  console.log(`listening`);
});


