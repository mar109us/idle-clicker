import pg from "pg";

const pool = new pg.Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

async function wipe() {
	try {
		await pool.query(`
      DROP TABLE IF EXISTS players CASCADE;
      DROP TABLE IF EXISTS player_state CASCADE;
      DROP TABLE IF EXISTS connection_test CASCADE;
    `);
		console.log("Database wiped clean.");
	} catch (err) {
		console.error("Wipe failed:", err);
	} finally {
		await pool.end();
	}
}

wipe();
