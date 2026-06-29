export async function doExercise(apiBase, playerId, actionType) {
	try {
		// Send the actionType (e.g., 'Walk', 'Gym') to your backend
		const res = await fetch(`${apiBase}/api/action/exercise`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ playerId, actionType }),
		});

		const data = await res.json();
		return res.ok ? data.stats : null;
	} catch (err) {
		console.error("Network error", err);
		return null;
	}
}
