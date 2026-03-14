import styles from "./SpaceColony.module.css";
import spaceColonyImg from "../../images/wheres-waldo-space-colony-chaos.jpg";

export default function SpaceColony() {
	return (
		<main className={styles.spaceColonyPage}>
			<img src={spaceColonyImg} alt="space colony" className={styles.cardImg} />
		</main>
	);
}
