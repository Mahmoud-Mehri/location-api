import express, { json, urlencoded } from "express";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import cors from "cors";

// Config
import config from "../../config";

// Routes
import { authRouter } from "./routes/auth-routes";
import { locationRouter } from "./routes/location-routes";

// Middlewares
import { authenticator } from "./middleware/authenticator";
import { handle404 } from "./middleware/error-handler";

const httpApp = express();

httpApp.use(urlencoded({ extended: true }));
httpApp.use(json());
httpApp.use(helmet());

const rateLimit = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
httpApp.use(rateLimit);

// For testing ...
httpApp.use(
  cors({
    credentials: true,
    origin: `http://localhost:${config.http.port}`,
  })
);

httpApp.use("/api", authRouter);

httpApp.use("/api/locations", authenticator);
httpApp.use("/api/locations", locationRouter);

httpApp.use(handle404);

export { httpApp };
