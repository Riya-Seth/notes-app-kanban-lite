import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // ✅ Read from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // ✅ Read from .env
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // ✅ Must match Google Cloud
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) return done(null, existingUser);

        // ✅ Otherwise, create a new user
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google-auth", // placeholder for users signed in via Google
        });

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// ✅ These are required for persistent login sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
