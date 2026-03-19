import styles from "./TargetCircle.module.css";

export default function TargetCircle({ target }) {
	if (!target) return null;

	return (
		<div
			className={styles.targetCircle}
			style={{
				"--x": `${target.x * 100}%`,
				"--y": `${target.y * 100}%`,
			}}
		/>
	);
}
