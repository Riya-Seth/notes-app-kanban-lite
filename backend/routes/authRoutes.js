import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import passport from "passport";   // ✅ Keep only ONE import
import "../config/passport.js";    // ✅ Ensure this loads before routes

const router = express.Router();

router.get("/google/callback", (req, res, next) => {
  console.log("📡 Google callback reached:", req.query);
  next();
});

/* ========================
   🧾 Signup Route
======================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/* ========================
   🔑 Login Route
======================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ========================
   🌐 Google OAuth Routes
======================== */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false, // ✅ prevent session error if not using express-session
  }),
  async (req, res) => {
    try {
      // ✅ Create a JWT for frontend use
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // ✅ Redirect to frontend with token
      res.redirect(`http://localhost:5173?token=${token}`);
    } catch (err) {
      console.error("Google Auth Callback Error:", err);
      res.redirect("http://localhost:5173/login?error=oauth_failed");
    }
  }
);

export default router;
