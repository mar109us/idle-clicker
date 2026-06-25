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
