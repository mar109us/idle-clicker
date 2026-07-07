import {
	state,
	updateState,
	properties,
	updateProperties,
	API_BASE,
} from "./model.js";
import { ui, updateUI, showMainContent } from "./view.js";
import { doExercise } from "/frontend/actions/left-menu/exercise.js";
import { bankViews } from "/frontend/actions/left-menu/bank.js";
import {
	internetViews,
	getItems,
	buildMarketViewItems,
	updateMarketPage,
} from "./content/left-menu/internet/market/market.js";


const TEST_PLAYER = 1;

/**
 * Fetches data from player database and inserts it into state object
 * @async
 * @returns {Promise<void>}
 */
async function loadPlayerData() {
	try {
		const playerData = await fetch(`${API_BASE}/api/player/${TEST_PLAYER}`);
		const dataFromDatabase = await playerData.json();

		if (playerData.ok) {
			updateState(dataFromDatabase);
			updateUI();
		}
	} catch (err) {
		console.error("Failed to load player", err);
	}
}
loadPlayerData();

/**
 * Fetches data from property database and inserts it into property object
 * @async
 * @returns {Promise<void>}
 */
export async function loadProperties() {
	try {
		const properties = await fetch(`${API_BASE}/api/properties`);
		const dataFromDatabase = await properties.json();

		if (properties.ok) {
			updateProperties(dataFromDatabase);
		}
	} catch (err) {
		console.error("Failed to load properties", err);
	}
	console.log(properties);
	getItems(); //update items

	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
	const outputDiv = document.getElementById("internet-output");
	if (outputDiv && internetViews.marketPropertyBuyLand) {
		/* outputDiv.innerHTML = internetViews.marketPropertyBuyLand();  */
		outputDiv.innerHTML = internetViews.item(1);
	}
	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
	// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
}
loadProperties();

// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
showMainContent("internet/internet");
// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD
// SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD // SET DEFAULT PAGE TO LOAD

ui.left.study.addEventListener("click", () => showMainContent("study"));
ui.left.work.addEventListener("click", () => showMainContent("work"));
ui.left.exercise.addEventListener("click", () => showMainContent("exercise"));
ui.left.travel.addEventListener("click", () => showMainContent("travel"));
ui.left.events.addEventListener("click", () => showMainContent("events"));
ui.left.bank.addEventListener("click", () => showMainContent("bank"));
ui.left.inventory.addEventListener("click", () => showMainContent("inventory"));
ui.left.social.addEventListener("click", () => showMainContent("social"));
ui.left.health.addEventListener("click", () => showMainContent("health"));
ui.left.internet.addEventListener("click", () =>
	showMainContent("internet/internet"),
);

/**
 * Handles buttons that do page return navigation to root pages in middle section
 * @returns {<void>}
 */
ui.middle.addEventListener("click", function (event) {
	if (event.target.classList.contains("go-back")) {
		const action = event.target.dataset.action;
		showMainContent(action);
	}
});

/**
 * Handles buttons in middle section
 * @async
 * @returns {Promise<void>}
 */
ui.middle.addEventListener("click", async function (event) {
	if (event.target.classList.contains("button-exercise")) {
		const actionType = event.target.innerText;

		const newStats = await doExercise(API_BASE, TEST_PLAYER, actionType);

		if (newStats) {
			state.character.stamina = newStats.stamina;
			state.character.experience = newStats.experience;
			updateUI();
		}
	}
	if (event.target.classList.contains("bank-nav")) {
		const action = event.target.dataset.action;
		const outputDiv = document.getElementById("bank-output");

		if (outputDiv && bankViews[action]) {
			outputDiv.innerHTML = bankViews[action]();
		}
	}
	const navElement = event.target.closest(".internet-nav");
	if (navElement) {
		const action = navElement.dataset.action;
		const itemId = navElement.dataset.id;
		const outputDiv = document.getElementById("internet-output");

		if (outputDiv && internetViews[action]) {
			outputDiv.innerHTML = internetViews[action](itemId);
		}
	}
	if (event.target.classList.contains("pagination-nav")) {
		const direction = event.target.dataset.direction;
		updateMarketPage(direction);
	}
});

/**
 * Handles submit buttons in middle section
 * @returns {void}
 */
ui.middle.addEventListener("submit", function (event) {
	if (event.target.id === "loan-form") {
		event.preventDefault();

		const formData = new FormData(event.target);
		const selectedLoan = formData.get("loan");

		const outputDiv = document.getElementById("bank-output");
		if (outputDiv) {
			outputDiv.innerHTML = bankViews.application(selectedLoan);
		}
	}
});
