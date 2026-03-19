import { useState, useEffect } from "react";
import styles from "./GameContainer.module.css";
import HUD from "../HUD/HUD.jsx";
import TargetCircle from "../TargetCircle/TargetCircle.jsx";
import TargetMenu from "../TargetMenu/TargetMenu.jsx";
import Markers from "../Markers/Markers.jsx";
import { startSession, guess } from "../../api/session.js";

export default function GameContainer({ src, alt = "game image", imageId }) {
	const [session, setSession] = useState(null);
	const [target, setTarget] = useState(null);
	const [markers, setMarkers] = useState([]);
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

	const availableCharacters = session.characters.filter(
		(name) => !session.guessedCharacters.includes(name),
	);

	return (
		<div className={styles.imgContainer}>
			<img
				src={src}
				alt={alt}
				onClick={handleClick}
				className={styles.gameImg}
			/>

			<TargetCircle target={target} />
			<TargetMenu
				target={target}
				availableCharacters={availableCharacters}
				onGuess={handleGuess}
			/>
		</div>
	);
}
