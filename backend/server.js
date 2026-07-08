import express from "express";
import playerRoutes from "./routes/playerRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigins = [
	"http://127.0.0.1:5500",
	"http://localhost:5500",
	"https://55clicks.com",
];

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

app.use("/api", playerRoutes);
app.use("/api", propertyRoutes);

app.get("/api/status", (req, res) => {
	res.json({ message: `Server is up on port ${PORT}` });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
