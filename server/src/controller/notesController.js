//=====================================================
// Notes Controller to handle CRUD operations for notes
//=====================================================
import Note from '../models/Note.js';

// Get all notes
async function getAllNotes (_,res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        res.status('500').json({message: "Error fetching notes", error: error.message});
    }
}

// Get notes by id
async function getNotesById (req,res) {
    try {
        const notes = await Note.findById(req.params.id);
         if(!notes){
            return res.status('404').json({message: "Note not found"});
         }
         console.log(notes);
         
        res.status(200).json(notes);
    } catch (error) {
        res.status('500').json({message: "Error fetching notes", error: error.message});
    }
}

// Create a new note
async function createNote (req,res)  {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        const savedNote = await newNote.save();
        res.status('201').json(savedNote); 
    } catch (error) {
        res.status('500').json({message: "Error creating note", error: error.message});
    }
}

// Update an existing note
async function updateNotes (req,res) {
    try {
         const {title, content} = req.body;
         const updateNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
         if(!updateNote){
            return res.status('404').json({message: "Note not found"});
         }
         res.status('200').json({message: "Note updated successfully!"});
    } catch (error) {
        res.status('500').json({message: "Error updating note", error: error.message});
    }
}

// Delete a note
async function deleteNotes (req,res) {
   try {
    const deleteNotes = await Note.findByIdAndDelete(req.params.id);
    if(!deleteNotes){
        return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted successfully!"});    
   } catch (error) {
    res.status(500).json({message: "Error deleting note", error: error.message});
   }
}

// Exporting the controller functions
export { getAllNotes, createNote, updateNotes, deleteNotes, getNotesById };