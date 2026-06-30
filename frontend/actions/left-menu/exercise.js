export async function doExercise(apiBase, playerId, actionType) {
	try {
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
