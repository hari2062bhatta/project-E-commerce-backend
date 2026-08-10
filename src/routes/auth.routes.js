import express from "express"
import passport from "passport"
import "../utils/goolgeSignup.js"
import {Register,Login,Logout,otpVerification,googleSignup, verifyGoogle} from "../controllers/auth.controller.js"
const authRouter=express.Router()

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.get("/logout",Logout)
authRouter.post("/otpverify",otpVerification)
authRouter.get("/googlesignup",googleSignup)
authRouter.get("/googleverify",passport.authenticate("google",{scope:["profile","email"]}))

authRouter.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("Google user:", req.user);

    req.session.user = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      googleId: req.user.googleId,
    };

    res.redirect("http://localhost:5173/dashboard");
  }
);
export default authRouter;