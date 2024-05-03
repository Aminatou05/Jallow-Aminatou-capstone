import mongoose from "mongoose";
  
//create user Schema

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar:{
        type: String,
        default: "https://unsplash.com/photos/silhouette-of-man-illustration-2LowviVHZ-E"
      }
   
    },
    { timestamps: true }
  );
  
  const User = mongoose.model('User', userSchema);
  
  export default User;