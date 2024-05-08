import express from "express";
  import Agent from '../models/agent.model.js'

const router = express.Router();

// seed route for agents
router.get("/seed", async (req, res) => {
    // console.log("Seeding agents...");
    try {
      await Agent.create([
        {
          name: "Alice Smith",
          email: "alice@example.com",
          phoneNumber: "555-123-4567",
          experience: 3,
          specialties: ["Residential Sales"]
        },
        {
          name: "Bob Johnson",
          email: "bob@example.com",
          phoneNumber: "555-234-5678",
          experience: 5,
          specialties: ["Commercial Leasing", "Luxury Properties"]
        }
      ]);
  
      res.send("Agents seeded successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error seeding agents");
    }
  });
  

export default router;
