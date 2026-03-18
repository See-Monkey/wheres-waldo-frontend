import { useState, useEffect } from "react";
import styles from "./GameContainer.module.css";
import { startSession, guess } from "../../api/session.js";

export default function GameContainer({ src, alt = "game image", imageId }) {
	const [session, setSession] = useState(null);
	const [target, setTarget] = useState(null);
	const [error, setError] = useState(null);
	console.log(imageId);

	useEffect(() => {
		async function init() {
			try {
				setSession(null); // reset BEFORE fetch

				const res = await startSession(imageId);

				setSession({
					id: res.sessionId,
					characters: res.characters,
					guessedCharacters: [],
					completionTime: null,
				});
			} catch (err) {
				console.error(err);
				setError(err.message);
			}
		}

		init();
	}, [imageId]);

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

	async function handleGuess(characterName, x, y) {
		const res = await guess(session.id, characterName, x, y);

		setSession((prev) => ({
			...prev,
			guessedCharacters: res.guessedCharacters,
			completionTime: res.completionTime,
		}));
	}

	if (error) return <div>Error: {error}</div>;
	if (!session) return <div>Loading...</div>;

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
