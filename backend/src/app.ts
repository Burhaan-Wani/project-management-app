import express from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/db.config";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const BASE_PATH = config.BASE_PATH;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Error handling middleware
app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
