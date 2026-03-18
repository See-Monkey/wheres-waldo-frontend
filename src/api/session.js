import { apiFetch } from "./client.js";

export function startSession(imageId) {
	return apiFetch(`/session/start/${imageId}`, {
		method: "POST",
	});
}

export function guess(sessionId, characterName, x, y) {
	return apiFetch(`/session/${sessionId}/guess`, {
		method: "POST",
		body: JSON.stringify({ characterName, x, y }),
	});
}
