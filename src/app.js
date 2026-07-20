import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import healthRouter from "./routes/health.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js";
import patternRouter from "./routes/pattern.routes.js";
import dsaRouter from "./routes/dsa.routes.js";



// routes declaration

app.use("/api/v1", router);
app.use(errorHandler);
app.use("/api/v1/patterns", patternRouter);
app.use("/api/v1/dsa", dsaRouter);
export default app;