import { Router } from "express";
import { applicationController } from "../controllers/applications";
import { applicationValidator } from "../middlewares/validations/applications";

const router = Router();

router.use(applicationValidator);

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

export default router;
