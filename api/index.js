import express from "express";

// creating express application today
const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`listening`);
  });