import express from "express";
import cors from "cors";
import session from "express-session";
import requestsRouter from "./routes/requests";
import authRouter from "./routes/auth";

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(session({
  secret: "your-secret-key", // change to a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    sameSite: "lax" // or "none" for cross-site with HTTPS
  }
}));

const PORT = process.env.PORT || 3000;

app.use("/api/requests", requestsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});