import { state, updateState, API_BASE } from "./model.js";
import { ui, updateUI, showMainContent } from "./view.js";
import { doExercise } from "/frontend/actions/left-menu/exercise.js";
import { bankViews } from "/frontend/actions/left-menu/bank.js";

async function loadPlayerData() {
	try {
		const res = await fetch(`${API_BASE}/api/player/${state.playerId}`);
		const dbData = await res.json();

		if (res.ok) {
			state.stats = { ...updateState, ...dbData };

			updateUI();
		}
	} catch (err) {
		console.error("Failed to load player", err);
	}
}

loadPlayerData();
showMainContent("bank");

ui.left.study.addEventListener("click", () => showMainContent("study"));
ui.left.work.addEventListener("click", () => showMainContent("work"));
ui.left.exercise.addEventListener("click", () => showMainContent("exercise"));
ui.left.travel.addEventListener("click", () => showMainContent("travel"));
ui.left.events.addEventListener("click", () => showMainContent("events"));
ui.left.bank.addEventListener("click", () => showMainContent("bank"));
ui.left.inventory.addEventListener("click", () => showMainContent("inventory"));
ui.left.social.addEventListener("click", () => showMainContent("social"));
ui.left.health.addEventListener("click", () => showMainContent("health"));

ui.middle.addEventListener("click", async function (event) {
	if (event.target.classList.contains("button-exercise")) {
		const actionType = event.target.innerText;

		const newStats = await doExercise(API_BASE, state.playerId, actionType);

		if (newStats) {
			state.stats.stamina = newStats.stamina;
			state.stats.experience = newStats.experience;
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
});

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
