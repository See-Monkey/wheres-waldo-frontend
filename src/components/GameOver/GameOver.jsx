import { useState, useEffect } from "react";
import styles from "./GameOver.module.css";
import { getLeaderboard, submitScore } from "../../api/leaderboard.js";

export default function GameOver({ imageId, session, qualifies }) {
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
			<div className={styles.gameOver}>
				<h2>Score: {session.completionTime.toFixed(2)}s</h2>
				{qualifies && (
					<>
						<p>You made the leaderboard!</p>

						{!submitted ? (
							<div className={styles.submitScoreContainer}>
								<input
									type="text"
									placeholder="Display Name"
									value={player}
									onChange={(e) => setPlayer(e.target.value)}
								/>

								<button onClick={() => handleSubmit(player)} disabled={!player}>
									Submit
								</button>
							</div>
						) : (
							<p>Score submitted!</p>
						)}
					</>
				)}

				{!qualifies && (
					<div className={styles.gameOver}>
						<h2>Game Over</h2>
					</div>
				)}

				{error && <p>{error}</p>}

				<div className={styles.leaderboardContainer}>
					<h3>Leaderboard</h3>

					{leaderboard.map((entry, i) => (
						<div
							key={`${entry.player}-${entry.completionTime}`}
							className={styles.entryContainer}
						>
							<p>
								{i + 1}. {entry.player}
							</p>
							<p>{entry.completionTime.toFixed(2)}s</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
