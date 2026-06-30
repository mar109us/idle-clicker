import express from "express";
import pg from "pg";
import pool from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigins = [
	"http://127.0.0.1:5500",
	"http://localhost:5500",
	"https://55clicks.com",
];

const initState = {
	stamina: 500,
	mental: 100,
	money: 96230053,

	experience: 0,

	property: {},
	car: {},
	boat: {},

	loan: {},
};

async function initializeDatabase() {
	try {
		await pool.query(`
         CREATE TABLE IF NOT EXISTS players (
            player_id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            created_at BIGINT NOT NULL
         );

         CREATE TABLE IF NOT EXISTS player_state (
            player_id INTEGER PRIMARY KEY REFERENCES players(player_id),
            data JSONB NOT NULL DEFAULT '{}'::jsonb
         );

         INSERT INTO players (player_id, username, created_at) 
         VALUES (1, 'TestPlayer', 1718000000) ON CONFLICT DO NOTHING;
         
         INSERT INTO player_state (player_id, data) 
         VALUES (1, '{}') ON CONFLICT DO NOTHING;
      `);
		console.log("Database tables verified and ready.");
	} catch (err) {
		console.error("Database initialization failed:", err);
	}
}

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

app.get("/api/player/:id", async (req, res) => {
	const { id } = req.params;
	const result = await pool.query(
		"SELECT data FROM player_state WHERE player_id = $1",
		[id],
	);

	if (result.rows.length === 0)
		return res.status(404).json({ error: "Not found" });

	const state = { ...initState, ...result.rows[0].data };
	res.json(state);
});

app.post("/api/action/exercise", async (req, res) => {
	const { playerId, actionType } = req.body;
	const expGain = 5;

	const costs = { Walk: 5, Jog: 10, Run: 15, Gym: 20, "Personal trainer": 30 };
	const staminaCost = costs[actionType] || 10;

	try {
		const result = await pool.query(
			"SELECT data FROM player_state WHERE player_id = $1",
			[playerId],
		);

		let state = { ...initState, ...result.rows[0].data };

		if (state.stamina < staminaCost) {
			return res.status(400).json({ error: "Not enough stamina" });
		}

		state.stamina -= staminaCost;
		state.experience += expGain;

		if (state.stamina < 0) state.stamina = 0;

		await pool.query(
			"UPDATE player_state SET data = $1 WHERE player_id = $2",
			[state, playerId],
		);

		res.json({ stats: state });
	} catch (err) {
		res.status(500).json({ error: "Action failed" });
	}
});

initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
