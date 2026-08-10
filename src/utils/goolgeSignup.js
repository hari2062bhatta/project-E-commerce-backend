import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/auth.models.js";
import dotenv from "dotenv"
dotenv.config()
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log("🔥 GOOGLE STRATEGY RUNNING");
        console.log("Profile:", profile);

        const email = profile.emails[0].value;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          console.log("✅ Existing user");
          return cb(null, existingUser);
        }

        const newUser = await User.create({
          fullName: profile.displayName,
          email,
          googleId: profile.id,
        });

        console.log("✅ New user created");

        return cb(null, newUser);

      } catch (error) {
        console.log("❌ OAuth error:", error);
        return cb(error, null);
      }
    }
  )
);


export default passport;