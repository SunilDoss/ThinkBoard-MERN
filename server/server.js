import express from 'express';
import notesRouter from './src/routes/notes.js';  

const app  = express();
const port = 5000;

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