import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Global congiguration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected successfully to mongo');
});
export default db;