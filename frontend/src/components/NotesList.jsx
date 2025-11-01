import NoteCard from "./NoteCard";

export default function NotesList({ notes, onDelete }) {
  return (
    <div>
      <h3>All Notes</h3>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
