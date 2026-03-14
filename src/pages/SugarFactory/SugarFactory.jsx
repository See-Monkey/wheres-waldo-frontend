import styles from "./SugarFactory.module.css";
import sugarFactoryImg from "../../images/wheres-waldo-the-sugar-fueled-industrial-nightmare.jpg";

export default function SugarFactory() {
	return (
		<main className={styles.sugarFactoryPage}>
			<img
				src={sugarFactoryImg}
				alt="sugar factory"
				className={styles.cardImg}
			/>
		</main>
	);
}
