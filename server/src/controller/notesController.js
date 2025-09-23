//=====================================================
// Notes Controller to handle CRUD operations for notes
//=====================================================

// Get all notes
function getAllNotes (req,res) {
    res.status('200').send("Hello from the backend server!");
}

// Create a new note
function createNote (req,res)  {
    res.status('201').json({message: "New note added successfully!"});
}

// Update an existing note
function updateNotes (req,res) {
    const noteId = req.params.id;
    res.status('200').json({message: "Note updated successfully!"});
}

// Delete a note
function deleteNotes (req,res) {
    const noteId = req.params.id;
    res.status('200').json({message: "Note deleted successfully!"});
}

// Exporting the controller functions
export { getAllNotes, createNote, updateNotes, deleteNotes };