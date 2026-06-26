const user = {
	creation: null,
	character: {
		experience: 100,
		health: 100,
		stamina: 100,
	},
};

const ui = {
	testing: {
		button: {
			initStats: document.getElementById("init-stats"),
			deleteAllCookies: document.getElementById("delete-all-cookies"),
			checkCookie: document.getElementById("check-cookie"),
			testDb: document.getElementById("test-db"),
		},
		output: {
			checkCookie: document.getElementById("display-all-cookies"),
		},
	},
	left: {
		study: document.getElementById("study"),
		work: document.getElementById("work"),
		excercise: document.getElementById("excercise"),
		travel: document.getElementById("travel"),
		events: document.getElementById("events"),
		bank: document.getElementById("bank"),
		inventory: document.getElementById("inventory"),
		social: document.getElementById("social"),
		health: document.getElementById("health"),
	},
	middle: document.getElementById("middle"),
	right: {},
};

// test buttons
ui.testing.button.testDb.addEventListener("click", testDatabaseConnection);

// ui buttons left
ui.left.study.addEventListener("click", function () {
	showMainContent("study");
});
ui.left.work.addEventListener("click", function () {
	showMainContent("work");
});
ui.left.excercise.addEventListener("click", function () {
	showMainContent("excercise");
	doExercise();
});
ui.left.travel.addEventListener("click", function () {
	showMainContent("travel");
});
ui.left.events.addEventListener("click", function () {
	showMainContent("events");
});
ui.left.bank.addEventListener("click", function () {
	showMainContent("bank");
});
ui.left.inventory.addEventListener("click", function () {
	showMainContent("inventory");
});
ui.left.social.addEventListener("click", function () {
	showMainContent("social");
});
ui.left.health.addEventListener("click", function () {
	showMainContent("health");
});

function showMainContent(selectedContent) {
	console.log(selectedContent);
	ui.middle.innerHTML = `<object width="100%" height="100%" type="text/html" data="content/left-menu/${selectedContent}.html"</object>`;
}
showMainContent("bank");

// Hardcode your test player ID for now so you don't have to keep creating characters
let currentPlayerId = 1;

// The source of truth for your UI
let currentStats = {
	experience: 0,
	health: 0,
	stamina: 0,
};

// Boot up the game state on page load

const API_BASE =
	window.location.hostname === "55clicks.com" ? "" : "http://localhost:3000";

console.log("Using API URL:", API_BASE);

// 1. Load data from the database
async function loadPlayerData() {
	try {
		const res = await fetch(`${API_BASE}/api/player/${currentPlayerId}`);
		const data = await res.json();

		if (res.ok) {
			currentStats = data;
			updateUI();
		}
	} catch (err) {
		console.error("Failed to load player", err);
	}
}

// 2. Perform the action
async function doExercise() {
	try {
		const res = await fetch(`${API_BASE}/api/action/exercise`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ playerId: currentPlayerId }),
		});

		const data = await res.json();

		if (res.ok) {
			console.log(data.message);
			// Update frontend object with the exact math from the database
			currentStats.stamina = data.stats.stamina;
			currentStats.experience = data.stats.experience;
			updateUI();
		} else {
			console.error(data.error); // E.g., "Not enough stamina"
		}
	} catch (err) {
		console.error("Network error", err);
	}
}

// 3. Re-render the numbers on the screen
function updateUI() {
	console.log("Current Stats:", currentStats);
	// Example of how you will eventually update your DOM:
	// document.getElementById("stamina-display").innerText = currentStats.stamina;
}

function testDatabaseConnection() {
	fetch(`${API_BASE}/api/test`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ test: 55 }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data.message);
			return fetch(`${API_BASE}/api/test`);
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("Updated test:", data.test);
		})
		.catch((error) => console.error("Fetch error:", error));
}

loadPlayerData();
