import express from "express";
import pool from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigins = [
	"http://127.0.0.1:5500",
	"http://localhost:5500",
	"https://55clicks.com",
];

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}

	next();
});

app.get("/api/status", (req, res) => {
	res.json({ message: `Server is up on port ${PORT}` });
});

app.get("/api/test", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT value FROM game_state WHERE key = $1",
			["myTest"],
		);

		if (result.rows.length === 0) {
			return res.json({ test: 0 });
		}

		res.json({ test: result.rows[0].value });
	} catch (err) {
		console.error(err.stack);
		res.status(500).json({ error: "Database query error" });
	}
});

app.post("/api/test", async (req, res) => {
	const newValue = req.body.test;
	try {
		await pool.query(
			"INSERT INTO game_state (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2",
			["myTest", newValue],
		);

		res.json({ message: "this is a test", test: newValue });
	} catch (err) {
		console.error(err.stack);
		res.status(500).json({ error: "Database save error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// GET: Load player data when they open the game
app.get("/api/player/:id", async (req, res) => {
	const playerId = req.params.id;
	try {
		const stats = await pool.query(
			`
         SELECT pb.health, pb.stamina, ps.experience 
         FROM player_bars pb
         JOIN player_stats ps ON pb.player_id = ps.player_id
         WHERE pb.player_id = $1
      `,
			[playerId],
		);

		if (stats.rows.length === 0)
			return res.status(404).json({ error: "Player not found" });
		res.json(stats.rows[0]);
	} catch (err) {
		res.status(500).json({ error: "Database error" });
	}
});

// POST: The Exercise Action (Your first game system)
app.post("/api/action/exercise", async (req, res) => {
	const { playerId } = req.body;
	const staminaCost = 10;
	const expGain = 5;

	try {
		// 1. Check if they have enough stamina
		const check = await pool.query(
			"SELECT stamina FROM player_bars WHERE player_id = $1",
			[playerId],
		);
		if (check.rows[0].stamina < staminaCost) {
			return res.status(400).json({ error: "Not enough stamina" });
		}

		// 2. Deduct stamina and add experience
		await pool.query(
			"UPDATE player_bars SET stamina = stamina - $1 WHERE player_id = $2",
			[staminaCost, playerId],
		);
		await pool.query(
			"UPDATE player_stats SET experience = experience + $1 WHERE player_id = $2",
			[expGain, playerId],
		);

		// 3. Send back the updated stats
		const updated = await pool.query(
			`
         SELECT pb.stamina, ps.experience 
         FROM player_bars pb JOIN player_stats ps ON pb.player_id = ps.player_id 
         WHERE pb.player_id = $1
      `,
			[playerId],
		);

		res.json({ message: "You hit the gym!", stats: updated.rows[0] });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Action failed" });
	}
});
