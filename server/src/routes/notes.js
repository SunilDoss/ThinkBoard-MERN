import express from 'express';
import { getAllNotes, createNote, updateNotes, deleteNotes, getNotesById } from '../controller/notesController.js'; // Adjust path as needed


const router = express.Router();

router.get('/',getAllNotes);// get all notes
router.get('/:id',getNotesById);// get note by id
router.post('/',createNote);// add a new note
router.put('/:id',updateNotes);// update an existing note
router.delete('/:id',deleteNotes);// delete a note


export default router;
