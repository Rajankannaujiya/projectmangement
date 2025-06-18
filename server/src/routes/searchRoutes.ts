import { Router } from "express";
import { search } from "../controllers/SearchController.ts";

const router = Router();

router.get("/", search);

export default router;