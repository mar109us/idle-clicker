import pg from "pg";

const pool = new pg.Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

async function seed() {
	try {
		// 1. Create Tables
		await pool.query(`
      CREATE TABLE IF NOT EXISTS players (
        player_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        created_at BIGINT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS player_bars (
        player_id INTEGER PRIMARY KEY REFERENCES players(player_id),
        health INTEGER DEFAULT 100,
        stamina INTEGER DEFAULT 100
      );

      CREATE TABLE IF NOT EXISTS player_stats (
        player_id INTEGER PRIMARY KEY REFERENCES players(player_id),
        experience INTEGER DEFAULT 0,
        money INTEGER DEFAULT 0
      );
    `);
		console.log("Tables created.");

		// 2. Insert Test Player
		await pool.query(`
      INSERT INTO players (player_id, username, created_at) VALUES (1, 'TestPlayer', 1718000000) ON CONFLICT DO NOTHING;
      INSERT INTO player_bars (player_id, stamina) VALUES (1, 100) ON CONFLICT DO NOTHING;
      INSERT INTO player_stats (player_id, experience, money) VALUES (1, 0, 0) ON CONFLICT DO NOTHING;
    `);
		console.log("Database seeded successfully.");
	} catch (err) {
		console.error("Seeding failed:", err);
	} finally {
		await pool.end();
	}
}

seed();
