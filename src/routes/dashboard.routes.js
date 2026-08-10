import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getOverview,
         getGithubDashboard,
         getDashboardActivities
 } from "../controllers/dashboard.controllers.js";


const router = Router();

router.route("/overview").get(verifyJWT, getOverview);
router.route("/github").get(verifyJWT, getGithubDashboard);
router.route("/activities").get(verifyJWT,getDashboardActivities);

export default router;