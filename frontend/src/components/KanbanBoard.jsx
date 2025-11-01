import React, { useState } from "react";
import NoteCard from "./NoteCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function KanbanBoard({ notes = [], onDelete, onEdit, onPin,onArchive}) {
  const [collapsed, setCollapsed] = useState({
    Idea: false,
    Draft: false,
    Done: false,
  });

  const toggleColumn = (status) => {
    setCollapsed((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const columns = ["Idea", "Draft", "Done"];

  return (
    <div className="kanban-wrapper">
      <div className="kanban-container">
        {columns.map((status) => {
          const columnNotes = notes
            .filter((n) => n.status === status)
            .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));

          return (
            <div
              key={status}
              className={`kanban-column ${status.toLowerCase()}`}
            >
              <div
                className="column-header"
                onClick={() => toggleColumn(status)}
              >
                <h5 className="column-title mb-0">{status}</h5>
                {collapsed[status] ? (
                  <ChevronDown size={20} className="dropdown-icon" />
                ) : (
                  <ChevronUp size={20} className="dropdown-icon" />
                )}
              </div>

              {!collapsed[status] && (
                <div className="notes-area">
                  {columnNotes.length === 0 ? (
                    <p className="empty-note">No notes yet</p>
                  ) : (
                    columnNotes.map((note) => (
                      <NoteCard
                        key={note._id}
                        note={note}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onPin={onPin} 
                        onArchive={onArchive} 
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
