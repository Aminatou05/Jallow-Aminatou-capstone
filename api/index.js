import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

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

// ================ Middleware ================
// creating a middleware funtion to handle possible errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


// ================ Routes ================
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// app.get('/test', (req, res) => {
//   res.send('Nakamu')
// })










app.listen(PORT, () => {
  console.log(`listening`);
});


