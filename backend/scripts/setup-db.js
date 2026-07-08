import pool from "../db/db.js";

async function runSetup() {
	await initializeDatabase();
	await initializeProperty();
	await pool.end();
}

const testPlayers = [
	{
		id: 1,
		username: "ionide",
		createdAt: null,
		createdAtDate: "",
	},
	{
		id: 2,
		username: "garret",
		createdAt: null,
		createdAtDate: "",
	},
];

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

function prepareTestPlayers() {
	const msCreated = new Date().getTime();
	const formattedDate = new Intl.DateTimeFormat("en-GB")
		.format(msCreated)
		.replace(/\//g, "-");

	for (const player of testPlayers) {
		player.createdAt = msCreated;
		player.createdAtDate = formattedDate;
	}
}

async function initializeDatabase() {
	prepareTestPlayers();

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

		for (const player of testPlayers) {
			await client.query(
				`
                INSERT INTO players (player_id, username, created_at, created_at_date) 
                VALUES ($1, $2, $3, $4)
                ON CONFLICT DO NOTHING;
                `,
				[
					player.id,
					player.username,
					player.createdAt,
					player.createdAtDate,
				],
			);

			await client.query(
				`
                INSERT INTO player_state (player_id, data) 
                VALUES ($1, '{}')
                ON CONFLICT DO NOTHING;
                `,
				[player.id],
			);
		}

		await client.query("COMMIT");
		console.log("Database tables verified and players ready.");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Database initialization failed:", err);
	} finally {
		client.release();
	}
}

async function initializeProperty() {
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
