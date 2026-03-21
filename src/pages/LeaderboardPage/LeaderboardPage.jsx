import { useEffect, useState } from "react";
import styles from "./LeaderboardPage.module.css";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { getLeaderboard } from "../../api/leaderboard";

export default function LeaderboardPage() {
	const [leaderboards, setLeaderboards] = useState({
		1: [],
		2: [],
		3: [],
	});

	useEffect(() => {
		async function loadLeaderboards() {
			try {
				const [ski, sugar, space] = await Promise.all([
					getLeaderboard(1),
					getLeaderboard(2),
					getLeaderboard(3),
				]);

				setLeaderboards({
					1: ski,
					2: sugar,
					3: space,
				});
			} catch (err) {
				console.error("Failed to load leaderboards:", err);
			}
		}

		loadLeaderboards();
	}, []);

	return (
		<main className={styles.leaderboardPage}>
			<Leaderboard leaderboard={leaderboards[1]} header="Ski Slopes" />
			<Leaderboard leaderboard={leaderboards[2]} header="Sugar Factory" />
			<Leaderboard leaderboard={leaderboards[3]} header="Space Colony" />
		</main>
	);
}
