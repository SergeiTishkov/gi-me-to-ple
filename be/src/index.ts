import { ensureEnvLoaded } from "./ensureEnv";
ensureEnvLoaded();

import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import campaignsRouter from "./routes/campaigns";
import authRouter from "./routes/auth";
import { CROWDFUNDING_DB_NAME, SESSIONS_COLLECTION_NAME } from "./appConsts";

const app = express();
app.use(cors({ origin: `http://localhost:${process.env.FRONTEND_PORT}`, credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `${process.env.MONGODB_URI}/admin`,
    dbName : CROWDFUNDING_DB_NAME,
    collectionName: SESSIONS_COLLECTION_NAME
  }),
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    sameSite: "lax" // or "none" for cross-site with HTTPS
  }
}));

const PORT = process.env.OWN_PORT || 43210;

app.use("/api/campaigns", campaignsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});