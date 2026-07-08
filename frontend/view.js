import { state } from "./model.js";

export const ui = {
	left: {
		study: document.getElementById("study"),
		work: document.getElementById("work"),
		exercise: document.getElementById("exercise"),
		travel: document.getElementById("travel"),
		events: document.getElementById("events"),
		bank: document.getElementById("bank"),
		inventory: document.getElementById("inventory"),
		social: document.getElementById("social"),
		health: document.getElementById("health"),
		internet: document.getElementById("internet"),
	},
	middle: document.getElementById("middle"),
	right: {
		playerId: document.getElementById("player-id"),
		playerHealth: document.getElementById("player-health"),
		playerMentalHealth: document.getElementById("player-mental-health"),
		playerMoney: document.getElementById("player-money"),
		playerExperience: document.getElementById("player-experience"),
		playerStamina: document.getElementById("player-stamina"),
		playerProperties: document.getElementById("player-properties"),
	},
};

/**
 * Assigns values to DOM elements with data from player stats
 * @returns {void}
 */
export function updateUI() {
	ui.right.playerId.innerText = "Player: " + state.player.username;
	ui.right.playerHealth.innerText = "Health: ";
	ui.right.playerMentalHealth.innerText = "Mental health: ";

	let money = Number(state.character.money);
	let moneycurrency = money.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});

	ui.right.playerMoney.innerText = "Money: " + moneycurrency;
	ui.right.playerExperience.innerText =
		"Experience: " + state.character.experience;
	ui.right.playerStamina.innerText = "Stamina: " + state.character.stamina;
	ui.right.playerProperties.innerText = "Owned properties: ";
	Object.values(state.ownedProperties).forEach((row) => {
		Object.entries(row).forEach(([key, value]) => {
			if (key === "property_id") {
				ui.right.playerProperties.innerText += `\nNorklickway ${value}, Klikkertown`;
			}
		});
	});

	console.log(state);
}

/**
 * Fetches and displays HTML content to middle section depending on received argument
 * @param {string} selectedContent - Name of an HTML document without file extension
 * @async
 * @returns {Promise<void>}
 */
export async function showMainContent(selectedContent) {
	try {
		const response = await fetch(`content/left-menu/${selectedContent}.html`);
		if (!response.ok) throw new Error("Page not found");

		const htmlText = await response.text();
		ui.middle.innerHTML = htmlText;
	} catch (error) {
		console.error("Failed to load page:", error);
		ui.middle.innerHTML = "<p>Error loading content.</p>";
	}
}
