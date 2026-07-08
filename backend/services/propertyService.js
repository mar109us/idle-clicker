import pool from "../db/db.js";

const initState = { stamina: 999999, mental: 999999, money: 50000000, experience: 999999 };

export async function processPropertyPurchase(buyerId, propertyId) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const propertyResult = await client.query(
            "SELECT owner, property_value FROM properties WHERE property_id = $1 FOR UPDATE",
            [propertyId]
        );

        if (propertyResult.rows.length === 0) throw new Error("Property not found");

        const property = propertyResult.rows[0];
        const sellerId = property.owner;
        const price = parseInt(property.property_value);

        if (parseInt(buyerId) === parseInt(sellerId)) throw new Error("You already own this property");

        const buyerResult = await client.query(
            "SELECT data FROM player_state WHERE player_id = $1 FOR UPDATE",
            [buyerId]
        );

        if (buyerResult.rows.length === 0) throw new Error("Buyer not found");
        let buyerState = { ...initState, ...buyerResult.rows[0].data };

        if (buyerState.money < price) throw new Error("Insufficient funds");

        const sellerResult = await client.query(
            "SELECT data FROM player_state WHERE player_id = $1 FOR UPDATE",
            [sellerId]
        );

        if (sellerResult.rows.length === 0) throw new Error("Seller not found");
        let sellerState = { ...initState, ...sellerResult.rows[0].data };

        buyerState.money -= price;
        sellerState.money += price;

        await client.query("UPDATE player_state SET data = $1 WHERE player_id = $2", [buyerState, buyerId]);
        await client.query("UPDATE player_state SET data = $1 WHERE player_id = $2", [sellerState, sellerId]);
        await client.query("UPDATE properties SET owner = $1 WHERE property_id = $2", [buyerId, propertyId]);

        await client.query("COMMIT");
        
        return buyerState.money;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err; // Pass the error up to the controller
    } finally {
        client.release();
    }
}

export async function getAllProperties() {
    const result = await pool.query(
        "SELECT * FROM properties ORDER BY property_id ASC"
    );
    return result.rows;
}