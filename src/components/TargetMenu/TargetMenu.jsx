import styles from "./TargetMenu.module.css";
import waldoSprite from "../../images/waldo.png";
import wendaSprite from "../../images/wenda.png";
import wizardSprite from "../../images/wizard-whitebeard.png";
import odlawSprite from "../../images/odlaw.png";

export default function TargetMenu({ target, availableCharacters, onGuess }) {
	const spriteMap = {
		waldo: waldoSprite,
		wenda: wendaSprite,
		wizard: wizardSprite,
		odlaw: odlawSprite,
	};

	if (!target || availableCharacters.length === 0) return null;

	// Offset so menu doesn't sit directly under cursor
	const OFFSET_X = 12;
	const OFFSET_Y = 12;

	return (
		<div
			className={styles.menu}
			onClick={(e) => e.stopPropagation()}
			style={{
				left: `calc(${target.x * 100}% + ${OFFSET_X}px)`,
				top: `calc(${target.y * 100}% + ${OFFSET_Y}px)`,
			}}
		>
			{availableCharacters.map((name) => (
				<button
					key={name}
					onClick={() => onGuess(name)}
					className={styles.characterBtn}
				>
					<img src={spriteMap[name]} alt={name} className={styles.sprite} />
				</button>
			))}
		</div>
	);
}
