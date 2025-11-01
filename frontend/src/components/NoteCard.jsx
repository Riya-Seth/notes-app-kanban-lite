import { useState } from "react";
import { exportNoteToPDF } from "../utils/exportPDF";

export default function NoteCard({ note, onDelete, onEdit, onPin, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState(note.status);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onEdit(note._id, { title, content, status });
    setIsEditing(false);
  };

  return (
    <div className="note-card">
      {isEditing ? (
        /* 📝 Edit Mode */
        <div>
          <input
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mb-2"
          />

          <textarea
            value={content}
            placeholder="Enter content"
            onChange={(e) => setContent(e.target.value)}
            className="form-control mb-2"
            rows="3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select mb-3"
          >
            <option>Idea</option>
            <option>Draft</option>
            <option>Done</option>
          </select>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success btn-sm w-50 me-1"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm w-50 ms-1"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* 👁 View Mode */
        <>
          <h5 className="fw-semibold mb-2">{note.title}</h5>
          <p className="note-text">{note.content}</p>
          <div className="note-meta">
            {note.tag && <span>{note.tag} • </span>}
            {note.status}
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-secondary btn-sm w-50 me-1"
              onClick={() => onArchive(note._id)}
            >
              {note.archived ? "Unarchive" : "Archive"}
            </button>

            <button
              className="btn btn-outline-warning btn-sm w-50 me-1"
              onClick={() => onPin(note._id)}
            >
              {note.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => exportNoteToPDF(note)}
            >
              Export
            </button>
            <button
              className="btn btn-outline-primary btn-sm w-50 me-1"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger btn-sm w-50 ms-1"
              onClick={() => onDelete(note._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
