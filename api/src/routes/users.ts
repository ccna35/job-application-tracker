import { Router } from "express";
import { userController } from "../controllers/users";
import { userValidator } from "../middlewares/validations/users";

const router = Router();

router.get("/", userController.getAllUsers);

router.use(userValidator); // Apply the user validation middleware to all routes in this file

router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;
