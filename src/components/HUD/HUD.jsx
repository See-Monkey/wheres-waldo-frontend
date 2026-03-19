import styles from "./HUD.module.css";

export default function HUD({
	time,
	characters,
	foundCharacters,
	feedback,
	completionTime,
}) {
	return (
		<div className={styles.hud}>
			<div className={styles.timer}>
				{completionTime !== null
					? `Completed in ${completionTime}s`
					: `Time: ${time}s`}
			</div>
			<div className={styles.characters}>
				Found: {foundCharacters.length} / {characters.length}
			</div>
			<div className={`${styles.feedback} ${!feedback ? styles.hidden : ""}`}>
				{feedback || "\u00A0"}
			</div>
		</div>
	);
}
