import { Link } from "react-router";
import styles from "./Home.module.css";
import skiSlopesImg from "../../images/wheres-waldo-the-ski-slopes-of-anarchy.jpg";
import sugarFactoryImg from "../../images/wheres-waldo-the-sugar-fueled-industrial-nightmare.jpg";
import spaceColonyImg from "../../images/wheres-waldo-space-colony-chaos.jpg";

export default function Home() {
	return (
		<main className={styles.homePage}>
			<div className={styles.contentContainer}>
				<div className={styles.card}>
					<Link to="/ski-slopes">
						<h2 className={styles.cardHeader}>Ski Slopes</h2>
						<img
							src={skiSlopesImg}
							alt="ski slopes"
							className={styles.cardImg}
						/>
					</Link>
				</div>

				<div className={styles.card}>
					<Link to="/sugar-factory">
						<h2 className={styles.cardHeader}>Sugar Factory</h2>
						<img
							src={sugarFactoryImg}
							alt="sugar factory"
							className={styles.cardImg}
						/>
					</Link>
				</div>

				<div className={styles.card}>
					<Link to="/space-colony">
						<h2 className={styles.cardHeader}>Space Colony</h2>
						<img
							src={spaceColonyImg}
							alt="space colony"
							className={styles.cardImg}
						/>
					</Link>
				</div>
			</div>
		</main>
	);
}
