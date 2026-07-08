import express from "express";
import {
	handleExercise,
	fetchPlayer,
} from "../controllers/playerController.js";

const router = express.Router();

router.post("/action/exercise", handleExercise);
router.get("/player/:id", fetchPlayer);

export default router;
