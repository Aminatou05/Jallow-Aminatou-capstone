import mongoose from "mongoose";

// Define the schema for the Real Estate Agent
const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  specialties: [String]
});

// Create a model for the Real Estate Agent schema
const Agent = mongoose.model('Agent', agentSchema);

export default  Agent;
