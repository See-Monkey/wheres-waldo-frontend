import styles from "./SkiSlopes.module.css";
import skiSlopesImg from "../../images/wheres-waldo-the-ski-slopes-of-anarchy.jpg";

export default function SkiSlopes() {
	return (
		<main className={styles.skiSlopesPage}>
			<img src={skiSlopesImg} alt="ski slopes" className={styles.cardImg} />
		</main>
	);
}
