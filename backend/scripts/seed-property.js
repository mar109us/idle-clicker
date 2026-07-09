import pool from "../db/db.js";

let propertyTypeSelected = "";
let propertyCreatedAt = null;
let propertyCreatedAtDate = "";
let propertyType = "land";
let propertyImage = null;
let propertySize = null;
let propertyValue = null;
let valuePerM2 = 15;
let setOwner = 2;
let isAvailable = true;

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

	propertySize = Math.floor(Math.random() * 1000000 + 51);

	if (propertySize > 150000) {
		let returnChance = Math.floor(Math.random() * 100 + 1);
		if (returnChance !== 1) {
			propertySize = Math.floor(Math.random() * 150000 + 51);
		}
	}

	propertyValue = propertySize * valuePerM2;
}

async function seedProperty() {
	createTestProperty();

	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		const propertyResult = await client.query(
			`
         INSERT INTO properties (type, created_at, created_at_date, image, property_size, property_value, owner, available) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
				isAvailable,
			],
		);

		const newPropertyId = propertyResult.rows[0].property_id;

		await client.query("COMMIT");
		console.log(
			`Success! Created new ${propertyType} (Property ID: ${newPropertyId}) for Owner ID: ${setOwner}`,
		);
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Failed to insert property:", err);
	} finally {
		client.release();
	}
}

async function seed(count) {
	for (let i = 0; i < count; i++) {
		await seedProperty();
	}
	await pool.end();
	console.log(`Batch complete. Created ${count} properties.`);
}

seed(100);
