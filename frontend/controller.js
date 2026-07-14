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
	sortItems,
} from "./content/left-menu/internet/market/market.js";
import { profileView } from "/frontend/content/right-menu/profile.js";

const TEST_PLAYER = 1;

export async function initializeApp() {
	await loadPlayerData();
	await loadProperties();
	await sortItems();
	await getItems();

	/* await showMainContent("internet/internet");
	const outputDiv = document.getElementById("internet-output");
	if (outputDiv && internetViews.marketPropertyBuyLand) {
		outputDiv.innerHTML = internetViews.marketPropertyBuyLand(); */
		
		/* outputDiv.innerHTML = internetViews.item(8); */
	/* } */

	/* ui.middle.innerHTML = profileView.profile; */
}
initializeApp();

/**
 * Fetches data from player database and inserts it into state object
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

/**
 * Fetches data from property database and inserts it into property object
 */
export async function loadProperties() {
	try {
		const load = await fetch(`${API_BASE}/api/properties`);
		const dataFromDatabase = await load.json();

		if (load.ok) {
			updateProperties(dataFromDatabase);
		}
	} catch (err) {
		console.error("Failed to load properties", err);
	}
}
loadProperties();

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
 * Handles buttons in right section
 */
addEventListener("click", async function (event) {
	if (event.target.classList.contains("player-profile")) {
		ui.middle.innerHTML = profileView.profile;
	}
});

/**
 * Handles buttons that do page return navigation to root pages in middle section
 */
ui.middle.addEventListener("click", function (event) {
	if (event.target.classList.contains("go-back")) {
		const action = event.target.dataset.action;
		showMainContent(action);
	}
});

/**
 * Handles buttons in middle section
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
		ui.middle.scrollTo({ top: 0, behavior: "smooth" });
		const direction = event.target.dataset.direction;
		updateMarketPage(direction);
		const outputDiv = document.getElementById("internet-output");
		outputDiv.innerHTML = internetViews.marketPropertyBuyLand();
	}

	const scrollDown = event.target.closest(".go-bottom");
	if (scrollDown) {
		console.log("aasd");
		ui.middle.scrollTo({ top: 100000000, behavior: "smooth" });
	}

	const scrollUp = event.target.closest(".go-up");
	if (scrollUp) {
		console.log("aasd");
		ui.middle.scrollTo({ top: 0, behavior: "smooth" });
	}

	const buyButton = event.target.closest(".buy-property");
	if (buyButton) {
		const action = buyButton.dataset.action;
		const itemId = buyButton.dataset.id;

		const payload = {
			buyerId: 1,
			propertyId: action,
			price: null,
		};

		const targetProperty = properties.find(
			(p) => p.property_id == payload.propertyId,
		);

		if (targetProperty) {
			payload.price = `${targetProperty.property_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
		}

		try {
			if (
				confirm(
					`Buy Norklickway ${payload.propertyId}? \n\nPrice\n$ ${payload.price}`,
				) === false
			) {
				return;
			}
			const response = await fetch(
				"http://localhost:3000/api/property/buy",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			const data = await response.json();

			if (response.ok) {
				console.log("Purchase successful!", data);
				alert("Property purchased!");
			} else {
				console.error("Purchase failed:", data.error);
				alert("Error: " + data.error);
			}
		} catch (err) {
			console.error("Network error:", err);
		}
		initializeApp();
	}
});

/**
 * Handles submit buttons in middle section
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

/**
 * Handles selection in middle section
 */
ui.middle.addEventListener("change", function (event) {
	console.log(event.target.value);
	if (event.target.value === "low") {
		console.log("low");
		sortItems("low");
		const outputDiv = document.getElementById("internet-output");
		outputDiv.innerHTML = internetViews.marketPropertyBuyLand();
	}
	if (event.target.value === "high") {
		console.log("high");
		sortItems("high");
		const outputDiv = document.getElementById("internet-output");
		outputDiv.innerHTML = internetViews.marketPropertyBuyLand();
	}
	ui.middle.scrollTo({ top: 0, behavior: "smooth" });
});
