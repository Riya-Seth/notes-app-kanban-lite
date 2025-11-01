import { useState } from "react";
import { ChevronLeft, ChevronRight, Archive, Settings } from "lucide-react";
import "./Sidebar.css";
import { exportNoteToPDF } from "../utils/exportPDF";
import html2pdf from "html2pdf.js";

export default function Sidebar({ onToggleArchiveView, onToggleDarkMode, notes }) {
  const [isOpen, setIsOpen] = useState(false);

  const exportAllNotes = () => {
    if (!notes || notes.length === 0) {
      alert("No notes available to export!");
      return;
    }

    const htmlContent = `
      <div style="font-family: 'Poppins', sans-serif; padding: 30px;">
        <h1 style="text-align:center;">📘 My Notes Collection</h1>
        <hr/>
        ${notes
          .map(
            (note) => `
            <div style="margin-bottom: 40px;">
              <h2>${note.title}</h2>
              <p>${note.content}</p>
              <p><strong>Tag:</strong> ${note.tag || "General"} | <strong>Status:</strong> ${note.status}</p>
            </div>`
          )
          .join("")}
        <p style="text-align:right; font-size:0.9rem;">Exported from Notes App</p>
      </div>
    `;

    html2pdf()
      .set({
        margin: 10,
        filename: "All_Notes.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(htmlContent)
      .save();
  };

  return (
    <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle btn btn-light"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <h5 className="fw-bold mb-3">Features</h5>

        <ul className="list-unstyled">
          <li className="mb-2">
            <button 
              className="btn btn-outline-secondary w-100"
              onClick={onToggleArchiveView}
            >
              <Archive size={16} className="me-2" />
              Archive Notes
            </button>
          </li>

          <li className="mb-2">
            <button 
              className="btn btn-outline-success w-100"
              onClick={exportAllNotes}
            >
              Export Notes
            </button>
          </li>

          <li>
            <button className="btn btn-outline-primary w-100">
              <Settings size={16} className="me-2" />
              More Coming Soon
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
