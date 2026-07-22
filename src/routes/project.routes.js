import { Router } from "express";
import{
    createProject,
    getAllProjects,
} from"../controllers/project.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createProject)
    .get(getAllProjects);




export default router;