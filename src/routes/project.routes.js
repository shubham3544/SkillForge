import { Router } from "express";
import{
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from"../controllers/project.controllers.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createProject)
    .get(getAllProjects);

router.route("/:projectId")
      .get(getProjectById)
      .patch(updateProject)
      .delete(deleteProject);




export default router;