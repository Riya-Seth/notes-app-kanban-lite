import axios from 'axios';

// ✅ Set the base URL to your backend (port 5050)
const API = axios.create({
  baseURL: "https://notes-app-kanban-lite-backend.onrender.com/api",
  withCredentials: true,
});

// CRUD operations
export const fetchNotes = () => API.get('/notes');
export const createNote = (note) => API.post('/notes', note);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const togglePin = (id) => API.patch(`/notes/${id}/pin`);
export const toggleArchive = (id) => API.patch(`/notes/${id}/archive`);
