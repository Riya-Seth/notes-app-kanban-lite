import mongoose from 'mongoose';

// Schema: defines how each note looks
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  tag: { type: String, default: 'General' },
  status: { type: String, default: 'Idea' },
  pinned: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Model: lets us create and query notes
const Note = mongoose.model('Note', noteSchema);

export default Note;
