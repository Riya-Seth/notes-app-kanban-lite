import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; // ✅ Make sure this import exists

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://notes-app-kanban-lite-backend.onrender.com/api/auth/login",
        { email, password }
      );

      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://notes-app-kanban-lite-backend.onrender.com/api/auth/google";
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="mb-4">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100 mb-3" type="submit">
            Login
          </button>
        </form>

        <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>
          <i className="bi bi-google me-2"></i> Continue with Google
        </button>

        <p className="mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
