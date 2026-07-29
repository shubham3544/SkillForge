import { Router } from "express";
import {
    testCreateActivity,
    testGetActivities,
} from "../controllers/activity.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/test").post(testCreateActivity);

router.route("/test").get(testGetActivities);

export default router;