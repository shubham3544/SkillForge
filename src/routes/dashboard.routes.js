import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getOverview } from "../controllers/dashboard.controllers.js";

const router = Router();

router.route("/overview").get(verifyJWT, getOverview);

export default router;