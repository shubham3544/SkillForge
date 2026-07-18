import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createPattern,
    getAllPatterns,
    getPatternById,
    updatePattern,
    deletePattern,
} from "../controllers/pattern.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createPattern)
    .get(getAllPatterns);

router.route("/:patternId")
    .get(getPatternById)
    .patch(updatePattern)
    .delete(deletePattern);

export default router;