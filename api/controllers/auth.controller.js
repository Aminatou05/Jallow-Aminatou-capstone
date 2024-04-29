  import User from '../models/user.model.js'
  import bcryptjs from 'bcryptjs';
  
  
  export const signup =  async (req, res) =>{
  const {username, email, password} = req.body;
  //using bcryptjs package  to hashed  passwords in the database
const hashedPassword = bcryptjs.hashSync(password, 10) //number of wrongs for creating salt
//creating a new user
  const newUser = new User({username,email, password: hashedPassword});
  try {
  await  newUser.save()
  res.status(201).json("User created successfully!")

  } catch (err) {
      res.status(400).send(err);
  }
}