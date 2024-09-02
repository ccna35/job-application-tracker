import { Router } from "express";
import { applicationController } from "../controllers/applications";
import {
  applicationValidator,
  deleteApplicationValidator,
} from "../middlewares/validations/applications";
import { verifyToken } from "../middlewares/authenticateJWT";

const router = Router();

router.use(verifyToken);

router.post("/", applicationValidator, applicationController.createApplication);
router.put(
  "/:id",
  applicationValidator,
  applicationController.updateApplication
);

router.get("/", applicationController.getAllApplications);
router.get(
  "/:id",
  deleteApplicationValidator,
  applicationController.getApplicationById
);
router.delete(
  "/:id",
  deleteApplicationValidator,
  applicationController.deleteApplication
);

export default router;
