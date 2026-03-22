const API_BASE = "https://wheres-waldo-backend-t6vh.onrender.com";

export async function apiFetch(endpoint, options = {}) {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	});

	if (!res.ok) {
		const error = await res.json().catch(() => null);
		throw new Error(error?.error || "API request failed");
	}

	if (res.status === 204) return null;

	return res.json();
}
