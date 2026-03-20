import styles from "./HUD.module.css";
import waldoSprite from "../../images/waldo.png";
import wendaSprite from "../../images/wenda.png";
import wizardSprite from "../../images/wizard-whitebeard.png";
import odlawSprite from "../../images/odlaw.png";
import xOverlay from "../../images/x-overlay.png";

export default function HUD({
	time,
	characters,
	foundCharacters,
	feedback,
	completionTime,
}) {
	const spriteMap = {
		waldo: waldoSprite,
		wenda: wendaSprite,
		wizard: wizardSprite,
		odlaw: odlawSprite,
	};

	return (
		<div className={styles.hud}>
			<div className={styles.hudContainer}>
				<div className={styles.timer}>
					{completionTime !== null
						? `Completed in ${completionTime}s`
						: `Time: ${time}s`}
				</div>
				<div className={`${styles.feedback} ${!feedback ? styles.hidden : ""}`}>
					{feedback || " "}
				</div>
				<div className={styles.characterContainer}>
					{characters.map((char) => {
						const isFound = foundCharacters.includes(char);
						return (
							<div key={char} className={styles.characterWrapper}>
								<img
									src={spriteMap[char]}
									alt={char}
									className={styles.characterSprite}
								/>
								{isFound && (
									<img src={xOverlay} alt="found" className={styles.overlay} />
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
