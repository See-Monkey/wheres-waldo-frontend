import { useState, useEffect } from "react";
import styles from "./Leaderboard.module.css";
import { getLeaderboard } from "../api/leaderboard";

export default function Leaderboard({ imageId }) {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		async function loadLeaderboard() {
			const data = await getLeaderboard(Number(imageId));
			setLeaderboard(data);
		}

		loadLeaderboard();
	}, [imageId]);

	if (!leaderboard.length) {
		return <div>Loading leaderboard...</div>;
	}

	return (
		<section className={styles.leaderboardSection}>
			{leaderboard.map((entry, i) => (
				<div key={i}>
					<span>{entry.player}</span>
					<span>{entry.completionTime}</span>
				</div>
			))}
		</section>
	);
}
