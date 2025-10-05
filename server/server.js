import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './src/routes/notes.js';  
import { connectDB } from './config/dbconnection.js';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors  from "cors";

dotenv.config();

const app  = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);

app.use('/api/notes',notesRouter);

// Root endpoint
app.get('/',(_,res) => {
    res.send("Welcome to ThinkBoard");
});

// Handle 404 - Not Found
app.use((req,res,next) => {
    res.status(404).send("404 Not Found");
})


connectDB().then(() => {
  // Start the server
  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
})