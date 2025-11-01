import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
  togglePin,
  toggleArchive,
} from "./api/noteApi";
import NoteForm from "./components/NoteForm";
import KanbanBoard from "./components/KanbanBoard";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { ChevronDown, ChevronUp } from "lucide-react";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showPinned, setShowPinned] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Load dark mode preference + notes
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
    if (token) loadNotes();
  }, [token]);

  // ✅ Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  const loadNotes = async () => {
    const res = await fetchNotes();
    setNotes(res.data);
    setFilteredNotes(res.data);
  };

  const handleCreate = async (data) => {
    await createNote(data);
    loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleEdit = async (id, data) => {
    await updateNote(id, data);
    loadNotes();
  };

  const handlePin = async (id) => {
    await togglePin(id);
    loadNotes();
  };

  const handleArchive = async (id) => {
    await toggleArchive(id);
    loadNotes();
  };

  const handleToggleArchiveView = () => setShowArchived((prev) => !prev);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredNotes(notes);
      return;
    }
    const filtered = notes.filter((note) =>
      `${note.title} ${note.content}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (token && (currentPath === "/login" || currentPath === "/signup")) {
      navigate("/");
    }
  }, [token, navigate]);

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <AppNavbar
                  onLogout={handleLogout}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />

                <main className="app-root">
                  <div className="app-inner text-center">
                    <header className="mb-4">
                      <h1 className="fw-bold display-5">Notes App</h1>
                    </header>

                    {/* ✏️ Note Form */}
                    <div className="form-container mb-5">
                      <div className="note-form-card">
                        <NoteForm onSubmit={handleCreate} />
                      </div>
                    </div>

                    {/* 🔍 Search Bar */}
                    <div className="search-container mb-5">
                      <input
                        type="text"
                        className="form-control search-bar"
                        placeholder="Search your notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        className="btn btn-primary ms-2 px-4"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>

                    {/* 📌 Pinned Notes */}
                    {filteredNotes.some((note) => note.pinned) && (
                      <section className="pinned-section mb-5">
                        <div
                          className="d-flex justify-content-between align-items-center mb-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPinned(!showPinned)}
                        >
                          <h4 className="fw-bold mb-4 text-center">
                            Pinned Notes
                          </h4>
                          {showPinned ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>

                        {showPinned && (
                          <div className="pinned-grid">
                            {filteredNotes
                              .filter((note) => note.pinned)
                              .map((note) => (
                                <div key={note._id} className="pinned-card">
                                  <div className="note-card-darkmode p-3 rounded shadow-sm position-relative">
                                    <h5 className="fw-semibold mb-2">
                                      {note.title}
                                    </h5>
                                    <p className="text-muted mb-2">
                                      {note.content}
                                    </p>
                                    <small className="text-secondary">
                                      {note.status}
                                    </small>
                                    <button
                                      className="btn btn-sm btn-outline-warning position-absolute top-0 end-0 m-2"
                                      onClick={() => handlePin(note._id)}
                                    >
                                      ⭐
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </section>
                    )}

                    {/* 🗂 Kanban / Archive */}
                    <div className="kanban-section">
                      {showArchived ? (
                        <div className="archive-section mt-4">
                          <h3 className="fw-bold mb-3">Archived Notes</h3>
                          <KanbanBoard
                            notes={filteredNotes.filter(
                              (note) => note.archived
                            )}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onPin={handlePin}
                            onArchive={handleArchive}
                          />
                        </div>
                      ) : (
                        <KanbanBoard
                          notes={filteredNotes.filter(
                            (note) => !note.archived
                          )}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPin={handlePin}
                          onArchive={handleArchive}
                        />
                      )}
                    </div>
                  </div>
                </main>

                <Sidebar onToggleArchiveView={handleToggleArchiveView} />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
