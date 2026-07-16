import { Router } from "express";
import healthCheck from "./health.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/health", healthCheck);
router.use("/users", userRouter);

export default router;