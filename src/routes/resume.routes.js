import { Router } from "express";

import {
    createResume,
    getAllResume,
    getResumeById,
    setPrimaryResume,
    deleteResume,
} from "../controllers/resume.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.use(verifyJWT);


router.route("/")
    .post(
        upload.single("resume"),
        createResume
    )
    .get(getAllResume);


router.route("/:resumeId")
    .get(getResumeById)
    .delete(deleteResume);


router.patch(
    "/:resumeId/primary",
    setPrimaryResume
);


export default router;