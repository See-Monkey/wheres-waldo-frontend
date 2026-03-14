import styles from "./SpaceColony.module.css";
import GameContainer from "../../components/GameContainer/GameContainer";
import spaceColonyImg from "../../images/wheres-waldo-space-colony.jpg";

export default function SpaceColony() {
	return (
		<main className={styles.spaceColonyPage}>
			<GameContainer src={spaceColonyImg} alt="space colony" />
		</main>
	);
}
