import Note from '../models/Note.js';

// 🟢 GET all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 POST - Create a new note
export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔵 PUT - Update an existing note
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 DELETE - Remove a note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ Toggle Pin Status
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.pinned = !note.pinned; // flip pinned value
    await note.save(); // ✅ save it back to the database

    res.json({
      message: "Pin status updated",
      pinned: note.pinned,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.archived = !note.archived; // Toggle
    await note.save();

    res.json({ message: "Note archive state toggled", note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.archived = !note.archived;
    await note.save();

    res.json({ message: "Archive status updated", archived: note.archived });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
