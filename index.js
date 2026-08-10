import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import connection from "./src/config/db.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";

dotenv.config();

const index = express();

index.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

index.use(express.json());

index.use(
  session({
    secret: "harry bhatta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

index.use(passport.initialize());

index.use("/auth", authRouter);

const Start = async () => {
  await connection();

  index.listen(process.env.PORT || 5000, () => {
    console.log(`server has started at port ${process.env.PORT || 5000}`);
  });
};

Start();