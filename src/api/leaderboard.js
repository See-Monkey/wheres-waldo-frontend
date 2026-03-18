import { apiFetch } from "./client";

export function getLeaderboard(imageId) {
	return apiFetch(`/leaderboard/${imageId}`);
}

export function submitScore(imageId, sessionId, player) {
	return apiFetch(`/leaderboard/${imageId}`, {
		method: "POST",
		body: JSON.stringify({ sessionId, player }),
	});
}
