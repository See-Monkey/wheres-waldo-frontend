import styles from "./SugarFactory.module.css";
import GameContainer from "../../components/GameContainer/GameContainer";
import sugarFactoryImg from "../../images/wheres-waldo-the-sugar-fueled-industrial-nightmare.jpg";

export default function SugarFactory() {
	return (
		<main className={styles.sugarFactoryPage}>
			<GameContainer src={sugarFactoryImg} alt="sugar factory" />
		</main>
	);
}
