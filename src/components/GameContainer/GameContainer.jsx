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
	const [feedback, setFeedback] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [time, setTime] = useState(0); // seconds
	const [error, setError] = useState(null);

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

	const sessionId = session?.id;

	useEffect(() => {
		if (!sessionId) return;

		const t = setTimeout(() => {
			setStartTime(Date.now());
			setTime(0);
		}, 0);

		return () => clearTimeout(t);
	}, [sessionId]);

	useEffect(() => {
		if (!startTime || session?.completionTime != null) return;

		const interval = setInterval(() => {
			setTime(Math.floor((Date.now() - startTime) / 1000));
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime, session?.completionTime]);

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

		// Show feedback
		setFeedback(res.correct ? "Correct!" : "Try again");

		// Remove target/menu
		setTarget(null);

		// Clear feedback after 2 seconds
		setTimeout(() => setFeedback(null), 2000);

		// Add good guess to Markers
		if (res.correct) {
			setMarkers((prev) => [...prev, { x, y }]);
		}
	}

	if (error) return <div>Error: {error}</div>;
	if (!session) return <div>Loading...</div>;

	const availableCharacters = session.characters.filter(
		(name) => !session.guessedCharacters.includes(name),
	);

	return (
		<>
			<HUD
				time={time}
				characters={session.characters}
				foundCharacters={session.guessedCharacters}
				feedback={feedback}
				completionTime={session.completionTime}
			/>
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
				<Markers markers={markers} />
			</div>
		</>
	);
}
