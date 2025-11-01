import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password,
      });

      // ✅ Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to home
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ Google Login
  //const handleGoogleLogin = () => {
  //  window.location.href = "http://localhost:5050/api/auth/google";
  //};

  return (
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

        <button className="btn btn-primary w-100">Login</button>
      </form>

      {/* ✅ Google Login Button */}
      <button
        className="btn btn-danger w-100 mt-3"
        onClick={() => {
          window.location.href = "http://localhost:5050/api/auth/google";
        }}>
        <i className="bi bi-google me-2"></i> Continue with Google
      </button>

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}
