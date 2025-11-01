import express from 'express';
import { getNotes, createNote, updateNote, deleteNote ,togglePin,toggleArchive} from "../controllers/noteController.js";

const router = express.Router();

// Define routes and connect them to controller functions
router.get('/', getNotes);         // Get all notes
router.post('/', createNote);      // Create a new note
router.put('/:id', updateNote);    // Update a note by ID
router.delete('/:id', deleteNote); // Delete a note by ID
router.patch("/:id/pin", togglePin);
router.patch("/:id/archive", toggleArchive); // ✅ NEW

export default router;
