import { Router } from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../validators/schemas.js";
import { getMyProfile, upsertMyProfile } from "../controllers/userController.js";

const router = Router();

router.get("/me", verifyAuth, getMyProfile);
router.post("/me", verifyAuth, validate(createUserSchema), upsertMyProfile);

export default router;