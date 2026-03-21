import styles from "./Leaderboard.module.css";

export default function Leaderboard({ leaderboard, header }) {
	if (!leaderboard.length) {
		return <div>Loading leaderboard...</div>;
	}

	return (
		<div className={styles.leaderboardContainer}>
			<h3>{header || "Leaderboard"}</h3>

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
	);
}
