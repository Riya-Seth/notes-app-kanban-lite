import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NoteForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("General");
  const [status, setStatus] = useState("Idea");
  const [preview, setPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content, tag, status });
    setTitle("");
    setContent("");
    setTag("General");
    setStatus("Idea");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h4 className="mb-3 fw-bold">Add a New Note</h4>

      <input
        type="text"
        placeholder="Enter note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-3"
      />

      {/* Markdown Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="fw-semibold">Content</label>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Edit Mode" : "Preview Mode"}
        </button>
      </div>

      {preview ? (
        <div className="markdown-preview p-3 rounded bg-light text-start">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          ) : (
            <p className="text-muted fst-italic">Nothing to preview...</p>
          )}
        </div>
      ) : (
        <textarea
          placeholder="Write your note (Markdown supported)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="form-control mb-3"
        />
      )}

      <div className="row mb-3">
        <div className="col">
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="form-select"
          >
            <option>General</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
          </select>
        </div>

        <div className="col">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option>Idea</option>
            <option>Draft</option>
            <option>Done</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Note
      </button>
    </form>
  );
}
