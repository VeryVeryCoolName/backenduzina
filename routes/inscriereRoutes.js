import { Router } from "express";
import { creareInscriere } from "../controllers/inscriereController.js";

const router = Router();

router.post("/",creareInscriere);
export default router;