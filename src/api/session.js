import { apiFetch } from "./client.js";

export function startSession(imageId) {
	return apiFetch(`/sessions/start/${imageId}`, {
		method: "POST",
	});
}

export function guess(sessionId, characterName, x, y) {
	return apiFetch(`/sessions/${sessionId}/guess`, {
		method: "POST",
		body: JSON.stringify({ characterName, x, y }),
	});
}
