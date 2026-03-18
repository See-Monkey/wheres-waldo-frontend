import styles from "./Leaderboard.module.css";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

export default function LeaderboardPage() {
	return (
		<main className={styles.leaderboardPage}>
			<Leaderboard imageId="1" />
			<Leaderboard imageId="2" />
			<Leaderboard imageId="3" />
		</main>
	);
}
