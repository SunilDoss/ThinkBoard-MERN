import express from 'express';
import { getAllNotes, createNote, updateNotes, deleteNotes } from '../controller/notesController.js'; // Adjust path as needed


const router = express.Router();

router.get('/',getAllNotes);// get all notes
router.post('/',createNote);// add a new note
router.put('/:id',updateNotes);// update an existing note
router.delete('/:id',deleteNotes);// delete a note


export default router;
