import styles from "./Markers.module.css";

export default function Markers({ markers }) {
	if (!markers) return null;

	return (
		<>
			{markers.map((marker, index) => (
				<div
					key={index}
					className={styles.marker}
					style={{
						"--x": `${marker.x * 100}%`,
						"--y": `${marker.y * 100}%`,
					}}
				/>
			))}
		</>
	);
}
