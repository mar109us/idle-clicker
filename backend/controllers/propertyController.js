import { processPropertyPurchase, getAllProperties } from "../services/propertyService.js";

export async function buyProperty(req, res) {
    const { buyerId, propertyId } = req.body;

    try {
        const newBalance = await processPropertyPurchase(buyerId, propertyId);
        
        res.json({
            success: true,
            message: "Property purchased",
            newBalance: newBalance,
        });
    } catch (err) {
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
    }
}

export async function fetchProperties(req, res) {
    try {
        const properties = await getAllProperties();
        res.json(properties);
    } catch (err) {
        console.error("Database query failed:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}