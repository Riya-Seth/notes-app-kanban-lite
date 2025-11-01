import { useState, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";

export default function AppNavbar({ onLogout }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Navbar
      expand="lg"
      variant={darkMode ? "dark" : "light"}
      className={`shadow-sm py-3 ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
      }`}
      style={{ transition: "background-color 0.4s ease" }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/" className="fw-semibold fs-4">
          Notes App
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">

          {/* Dark Mode Button */}
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={toggleDarkMode}
            className="d-flex align-items-center gap-2"
          >
            <i
              className={`bi ${
                darkMode ? "bi-sun-fill text-warning" : "bi-moon-stars-fill"
              }`}
            ></i>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          {/* Logout Button */}
          <Button
            className="btn ms-2"
            onClick={onLogout}
          >
            Logout
          </Button>

        </div>
      </Container>
    </Navbar>
  );
}
