import { Router } from "express";
import {
    connectLeetCode,
    getLeetCodeDashboard
} from "../controllers/leetcode.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT);
router.route("/connect").post(connectLeetCode);
router.route("/stats").get(getLeetCodeDashboard);

export default router;

