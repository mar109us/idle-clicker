import pool from "../db.js";

const initState = {
	stamina: 999999,
	mental: 999999,
	money: 50000000,
	experience: 999999,
};

const costs = { Walk: 5, Jog: 10, Run: 15, Gym: 20, "Personal trainer": 30 };
const expGain = 5;

export async function performExercise(playerId, actionType) {
	const staminaCost = costs[actionType] || 10;

	const result = await client.query(
		"SELECT data FROM player_state WHERE player_id = $1 FOR UPDATE",
		[playerId],
	);

	if (result.rows.length === 0) throw new Error("Player not found");

	let state = { ...initState, ...result.rows[0].data };

	if (state.stamina < staminaCost) {
		throw new Error("Not enough stamina");
	}

	state.stamina = Math.max(0, state.stamina - staminaCost);
	state.experience += expGain;

	await pool.query("UPDATE player_state SET data = $1 WHERE player_id = $2", [
		state,
		playerId,
	]);

	return state;
}

export async function getPlayerState(playerId) {
	const stateResult = await pool.query(
		"SELECT data FROM player_state WHERE player_id = $1",
		[playerId],
	);
	const playerResult = await pool.query(
		"SELECT * FROM players WHERE player_id = $1",
		[playerId],
	);
	const propertiesResult = await pool.query(
		"SELECT * FROM properties WHERE owner = $1",
		[playerId],
	);

	if (stateResult.rows.length === 0 || playerResult.rows.length === 0) {
		throw new Error("Not found");
	}

	return {
		player: { ...playerResult.rows[0] },
		character: {
			...initState,
			...stateResult.rows[0].data,
		},
		ownedProperties: propertiesResult.rows,
	};
}
