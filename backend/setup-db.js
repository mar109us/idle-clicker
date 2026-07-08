import pool from "./db.js";

async function runSetup() {
	await initializeDatabase();
	await initializeProperty();
	await pool.end();
}

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

runSetup();
