import { Router } from "express";
import { listPackages, getPackageBySlug } from "../controllers/packageController.js";

const router = Router();

router.get("/", listPackages);
router.get("/:slug", getPackageBySlug);

export default router;