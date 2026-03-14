import { useState } from "react";
import styles from "./GameContainer.module.css";

export default function GameContainer({ src, alt = "game image" }) {
	const [target, setTarget] = useState(null);

	const handleClick = (e) => {
		// If target already exists, remove it
		if (target) {
			setTarget(null);
			return;
		}

		const rect = e.currentTarget.getBoundingClientRect();

		// Get click coordinates as values between 0 and 1
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		setTarget({ x, y });
	};

	return (
		<div className={styles.imgContainer} onClick={handleClick}>
			<img src={src} alt={alt} />

			{target && (
				<div
					className={styles.targetingBox}
					style={{
						"--x": `${target.x * 100}%`,
						"--y": `${target.y * 100}%`,
					}}
				/>
			)}
		</div>
	);
}
