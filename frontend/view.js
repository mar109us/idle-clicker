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
	},
	middle: document.getElementById("middle"),
	right: {
		pId: document.getElementById("player-id"),
		pHealth: document.getElementById("player-health"),
		pMentalHealth: document.getElementById("player-mental-health"),
		pMoney: document.getElementById("player-money"),
		pExperience: document.getElementById("player-experience"),
		pStamina: document.getElementById("player-stamina"),
	},
};

/**
 * Assigns values to DOM elements with data from player stats
 * @returns {void}
 */
export function updateUI() {
	ui.right.pId.innerText = "Player: " + state.userName;
	ui.right.pHealth.innerText = "Health: ";
	ui.right.pMentalHealth.innerText = "Mental health: ";

	let money = Number(state.stats.money);
	let moneycurrency = money.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});

	ui.right.pMoney.innerText = "Money: " + moneycurrency;
	ui.right.pExperience.innerText = "Experience: " + state.stats.experience;
	ui.right.pStamina.innerText = "Stamina: " + state.stats.stamina;

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
