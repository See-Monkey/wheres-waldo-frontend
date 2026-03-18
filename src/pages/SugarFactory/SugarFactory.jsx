import styles from "./SugarFactory.module.css";
import GameContainer from "../../components/GameContainer/GameContainer";
import sugarFactoryImg from "../../images/wheres-waldo-sugar-factory.jpg";

export default function SugarFactory() {
	return (
		<main className={styles.sugarFactoryPage}>
			<GameContainer src={sugarFactoryImg} alt="sugar factory" imageId="2" />
		</main>
	);
}
