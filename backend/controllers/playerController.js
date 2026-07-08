import { performExercise, getPlayerState } from "../services/playerService.js";

export async function handleExercise(req, res) {
	const { playerId, actionType } = req.body;
	try {
		const newState = await performExercise(playerId, actionType);
		res.json({ stats: newState });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export async function fetchPlayer(req, res) {
	const { id } = req.params;

	try {
		const state = await getPlayerState(id);
		res.json(state);
	} catch (err) {
		if (err.message === "Not found") {
			return res.status(404).json({ error: "Not found" });
		}
		console.error("Failed to fetch player:", err);
		res.status(500).json({ error: "Internal server error" });
	}
}
