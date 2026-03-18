import styles from "./SkiSlopes.module.css";
import GameContainer from "../../components/GameContainer/GameContainer";
import skiSlopesImg from "../../images/wheres-waldo-ski-slopes.jpg";

export default function SkiSlopes() {
	return (
		<main className={styles.skiSlopesPage}>
			<GameContainer src={skiSlopesImg} alt="ski slopes" imageId={1} />
		</main>
	);
}
