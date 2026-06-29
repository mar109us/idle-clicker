export const API_BASE =
	window.location.hostname === "55clicks.com" ? "" : "http://localhost:3000";

export const state = {
	playerId: 1,
	stats: {},
};

export function updateState(newState) {
	state.stats = newState;
}
