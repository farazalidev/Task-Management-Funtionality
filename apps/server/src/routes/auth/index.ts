import { Router } from "express";
import { validateBodySchema } from "../../middlewares/validateBodySchema";
import { LoginSchema, RegisterSchema } from "../../utils/validations/auth";
import { loginController, RegisterController } from "../../controllers/auth";

const router = Router();

router.post("/auth/login", validateBodySchema(LoginSchema), loginController);
router.post(
  "/auth/register",
  validateBodySchema(RegisterSchema),
  RegisterController,
);

export { router as AuthRoutes };
