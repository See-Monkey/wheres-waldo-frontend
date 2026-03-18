import { useState, useEffect } from "react";
import styles from "./SubmitScoreModal.module.css";
import { getLeaderboard, submitScore } from "../api/leaderboard";

export default function SubmitScoreModal({ imageId, session }) {
	const [leaderboard, setLeaderboard] = useState([]);
	const [player, setPlayer] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function load() {
			const data = await getLeaderboard(imageId);
			setLeaderboard(data);
		}
		load();
	}, [imageId]);

	async function handleSubmit(playerName) {
		try {
			await submitScore(imageId, session.id, playerName);

			// refresh leaderboard after submit
			const updated = await getLeaderboard(imageId);
			setLeaderboard(updated);

			setSubmitted(true);
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.submitScoreModal}>
				<h2>Score: {session.completionTime.toFixed(2)}s</h2>

				{!submitted ? (
					<>
						<input
							type="text"
							placeholder="Your name"
							value={player}
							onChange={(e) => setPlayer(e.target.value)}
						/>

						<button onClick={() => handleSubmit(player)} disabled={!player}>
							Submit
						</button>
					</>
				) : (
					<p>Score submitted!</p>
				)}

				{error && <p>{error}</p>}

				<hr />

				<h3>Leaderboard</h3>
				{leaderboard.map((entry, i) => (
					<div key={`${entry.player}-${entry.completionTime}`}>
						<span>
							{i + 1}. {entry.player}
						</span>
						<span>{entry.completionTime.toFixed(2)}s</span>
					</div>
				))}
			</div>
		</div>
	);
}
