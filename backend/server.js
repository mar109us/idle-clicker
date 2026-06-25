const express = require("express");
const app = express();
const PORT = 3000;

// This allows Express to read incoming JSON data
app.use(express.json());

// A simple test route to verify it is working
app.get("/api/status", (req, res) => {
	res.json({ message: `Server is up on port ${PORT}` });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

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

let myTest = 0;

app.get("/api/test", (req, res) => {
	res.json({ test: myTest });
});

app.post("/api/test", (req, res) => {
	myTest = req.body.test;
	res.json({ message: "this is a test", test: myTest });
});
