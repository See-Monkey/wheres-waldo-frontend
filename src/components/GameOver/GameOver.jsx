import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./GameOver.module.css";
import Leaderboard from "../Leaderboard/Leaderboard.jsx";
import { getLeaderboard, submitScore } from "../../api/leaderboard.js";

export default function GameOver({ imageId, session, qualifies }) {
	const [player, setPlayer] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [leaderboard, setLeaderboard] = useState([]);
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

								<button
									onClick={() => handleSubmit(player)}
									disabled={!player}
									className={styles.submitBtn}
								>
									Submit
								</button>
							</div>
						) : (
							<p>Score submitted!</p>
						)}
					</>
				)}

				{!qualifies && <h2>Game Over</h2>}

				{error && <p>{error}</p>}

				<Leaderboard leaderboard={leaderboard} />

				<Link to="/">
					<button type="button" className={styles.homeBtn}>
						Home
					</button>
				</Link>
			</div>
		</div>
	);
}
