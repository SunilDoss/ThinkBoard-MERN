import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './src/routes/notes.js';  
import { connectDB } from './config/dbconnection.js';

dotenv.config();

const app  = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/notes',notesRouter);

// Root endpoint
app.get('/',(req,res) => {
    res.send("Welcome to ThinkBoard");
});

// Handle 404 - Not Found
app.use((req,res,next) => {
    res.status(404).send("404 Not Found");
})

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});