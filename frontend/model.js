/**
 * Checks if site is viewed locally or via domain
 */
export const API_BASE =
	window.location.hostname === "55clicks.com" ? "" : "http://localhost:3000";

/**
 * Creates state object
 *
 * Key stats created empty - data inserted elsewhere
 *
 * ### playerId: HARDCODED FOR DEVELOPMENT ###
 */
export let state = {};

/**
 * Fills state object with database data
 * @param {JSON} newState Argument from loadPlayerData() containing player data from database
 * @returns {void}
 */
export function updateState(newState) {
	state = newState;
}
