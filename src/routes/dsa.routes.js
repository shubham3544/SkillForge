import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import{
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
} from "../controllers/dsa.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
      .post(createProblem)
      .get(getAllProblems);

router.route("/:problemId")
      .get(getProblemById)
      .patch(updateProblem)
      .delete(deleteProblem);

export default router;