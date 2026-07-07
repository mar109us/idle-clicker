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
	stamina: 999999,
	mental: 999999,
	money: 50000000,

	experience: 999999,
};

/* const testPlayer = {
	id: 1,
	username: "ionide",
	createdAt: null,
	createdAtDate: "",
}; */

/* const testPlayer = {
	id: 2,
	username: "Garret",
	createdAt: null,
	createdAtDate: "",
}; */

const property = {
	nonCommercial: {
		land: {},
		farm: {},
		house: {},
		cabin: {},
		apartment: {},
		parking: {},
	},
	commercial: {
		land: {},
		store: {},
		hotel: {},
		office: {},
		parking: {},
		mall: {},
		repair: {},
		warehouse: {},
		education: {},
		industrial: {},
		restaurant: {},
	},
};

function createTestPlayer() {
	const msCreated = new Date().getTime();

	const formattedDate = new Intl.DateTimeFormat("en-GB")
		.format(msCreated)
		.replace(/\//g, "-");

	testPlayer.createdAt = msCreated;
	console.log(testPlayer.createdAt);

	testPlayer.createdAtDate = formattedDate;
	console.log(testPlayer.createdAtDate);
}

async function initializeDatabase() {
	/* createTestPlayer(); */

	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		await client.query(`
         CREATE TABLE IF NOT EXISTS players (
            player_id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            created_at BIGINT NOT NULL,
            created_at_date VARCHAR(50) NOT NULL
         );

         CREATE TABLE IF NOT EXISTS player_state (
            player_id INTEGER PRIMARY KEY REFERENCES players(player_id),
            data JSONB NOT NULL DEFAULT '{}'::jsonb
         );
      `);

		await client.query(
			`
         INSERT INTO players (player_id, username, created_at, created_at_date) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING;
      `,
			[
				testPlayer.id,
				testPlayer.username,
				testPlayer.createdAt,
				testPlayer.createdAtDate,
			],
		);

		await client.query(
			`
         INSERT INTO player_state (player_id, data) 
         VALUES ($1, '{}')
         ON CONFLICT DO NOTHING;
      `,
			[testPlayer.id],
		);

		await client.query("COMMIT");
		console.log("Database tables verified and ready.");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Database initialization failed:", err);
	} finally {
		client.release();
	}
}

let propertyTypeSelected = "";
let propertyCreatedAt = null;
let propertyCreatedAtDate = "";
let propertyType = "land";
let propertyImage = null;
let propertySize = null;
let propertyValue = null;
let valuePerM2 = 8;
let setOwner = 2;

function createTestProperty() {
	const msCreated = new Date().getTime();

	const formattedDate = new Intl.DateTimeFormat("en-GB")
		.format(msCreated)
		.replace(/\//g, "-");

	/* 	let getRandomPropertyType = Math.floor(Math.random() * propertyType.length);
	propertyTypeSelected = propertyType[getRandomPropertyType];
	console.log(propertyTypeSelected); */

	propertyCreatedAt = msCreated;

	propertyCreatedAtDate = formattedDate;

	propertyImage = Math.floor(Math.random() * 10 + 1);

	propertySize = Math.floor(Math.random() * 1000000 + 50);

	propertyValue = propertySize * valuePerM2;
}

async function initializeProperty() {
	createTestProperty();

	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		await client.query(`
         CREATE TABLE IF NOT EXISTS properties (
            property_id SERIAL PRIMARY KEY NOT NULL,
            type VARCHAR(50) NOT NULL,
				created_at BIGINT NOT NULL,
            created_at_date VARCHAR(50) NOT NULL,
				image BIGINT NOT NULL,
				property_size BIGINT NOT NULL,
				property_value BIGINT NOT NULL,
				owner BIGINT NOT NULL
         );

         CREATE TABLE IF NOT EXISTS property_state (
            property_id INTEGER PRIMARY KEY REFERENCES properties(property_id),
            data JSONB NOT NULL DEFAULT '{}'::jsonb
         );
      `);

		const propertyResult = await client.query(
			`
         INSERT INTO properties (type, created_at, created_at_date, image, property_size, property_value, owner) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING property_id;
         `,
			[
				propertyType,
				propertyCreatedAt,
				propertyCreatedAtDate,
				propertyImage,
				propertySize,
				propertyValue,
				setOwner,
			],
		);

		if (propertyResult.rows.length > 0) {
			const newPropertyId = propertyResult.rows[0].property_id;

			await client.query(
				`
            INSERT INTO property_state (property_id, data) 
            VALUES ($1, '{}')
            ON CONFLICT DO NOTHING;
            `,
				[newPropertyId],
			);
		}

		await client.query("COMMIT");
		console.log("Database tables verified and ready.");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Database initialization failed:", err);
	} finally {
		client.release();
	}
}

app.post("/api/property/buy", async (req, res) => {
	const { buyerId, propertyId } = req.body;
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		const propertyResult = await client.query(
			"SELECT owner, property_value FROM properties WHERE property_id = $1 FOR UPDATE",
			[propertyId],
		);

		if (propertyResult.rows.length === 0) {
			throw new Error("Property not found");
		}

		const property = propertyResult.rows[0];
		const sellerId = property.owner;
		const price = parseInt(property.property_value);

		if (parseInt(buyerId) === parseInt(sellerId)) {
			throw new Error("You already own this property");
		}

		const buyerResult = await client.query(
			"SELECT data FROM player_state WHERE player_id = $1 FOR UPDATE",
			[buyerId],
		);

		if (buyerResult.rows.length === 0) throw new Error("Buyer not found");
		let buyerState = { ...initState, ...buyerResult.rows[0].data };

		if (buyerState.money < price) {
			throw new Error("Insufficient funds");
		}

		const sellerResult = await client.query(
			"SELECT data FROM player_state WHERE player_id = $1 FOR UPDATE",
			[sellerId],
		);

		if (sellerResult.rows.length === 0) throw new Error("Seller not found");
		let sellerState = { ...initState, ...sellerResult.rows[0].data };

		buyerState.money -= price;
		sellerState.money += price;

		await client.query(
			"UPDATE player_state SET data = $1 WHERE player_id = $2",
			[buyerState, buyerId],
		);

		await client.query(
			"UPDATE player_state SET data = $1 WHERE player_id = $2",
			[sellerState, sellerId],
		);

		await client.query(
			"UPDATE properties SET owner = $1 WHERE property_id = $2",
			[buyerId, propertyId],
		);

		await client.query("COMMIT");

		res.json({
			success: true,
			message: "Property purchased",
			newBalance: buyerState.money,
		});
	} catch (err) {
		await client.query("ROLLBACK");

		const customErrors = [
			"Property not found",
			"You already own this property",
			"Buyer not found",
			"Seller not found",
			"Insufficient funds",
		];

		const errorMessage = customErrors.includes(err.message)
			? err.message
			: "Transaction failed";

		res.status(400).json({ error: errorMessage });
	} finally {
		client.release();
	}
});

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

	try {
		const stateResult = await pool.query(
			"SELECT data FROM player_state WHERE player_id = $1",
			[id],
		);

		const playerResult = await pool.query(
			"SELECT * FROM players WHERE player_id = $1",
			[id],
		);

		const propertiesResult = await pool.query(
			"SELECT * FROM properties WHERE owner = $1",
			[id],
		);

		if (stateResult.rows.length === 0 || playerResult.rows.length === 0) {
			return res.status(404).json({ error: "Not found" });
		}

		const state = {
			player: {
				...playerResult.rows[0],
			},
			character: {
				...initState,
				...stateResult.rows[0].data,
			},
			ownedProperties: propertiesResult.rows,
		};

		res.json(state);
	} catch (err) {
		console.error("Failed to fetch player:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/api/properties", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM properties ORDER BY property_id ASC",
		);

		res.json(result.rows);
	} catch (err) {
		console.error("Database query failed:", err);
		res.status(500).json({ error: "Internal server error" });
	}
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
initializeProperty();
initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
