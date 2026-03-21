import { useState, useEffect } from "react";
import styles from "./GameContainer.module.css";
import HUD from "../HUD/HUD.jsx";
import TargetCircle from "../TargetCircle/TargetCircle.jsx";
import TargetMenu from "../TargetMenu/TargetMenu.jsx";
import Markers from "../Markers/Markers.jsx";
import GameOver from "../GameOver/GameOver.jsx";
import qualifiesForTopTen from "../../functions/qualifiesForTopTen.js";
import { startSession, guess } from "../../api/session.js";
import { getLeaderboard } from "../../api/leaderboard.js";

export default function GameContainer({ src, alt = "game image", imageId }) {
	const [session, setSession] = useState(null);
	const [target, setTarget] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [feedback, setFeedback] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [time, setTime] = useState(0); // seconds
	const [gameOver, setGameOver] = useState(false);
	const [qualifies, setQualifies] = useState(false);
	const [error, setError] = useState(null);

	// Create session and return the image's characters
	useEffect(() => {
		async function init() {
			try {
				// Reset before fetch
				setSession(null);
				setQualifies(false);
				setGameOver(false);
				setMarkers([]);

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

	// Restart HUD timer if session changes
	useEffect(() => {
		if (!sessionId) return;

		const t = setTimeout(() => {
			setStartTime(Date.now());
			setTime(0);
		}, 0);

		return () => clearTimeout(t);
	}, [sessionId]);

	// HUD timer
	useEffect(() => {
		if (!startTime || session?.completionTime != null) return;

		const interval = setInterval(() => {
			setTime(Math.floor((Date.now() - startTime) / 1000));
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime, session?.completionTime]);

	// Handle targeting click for guessing
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

	// Handle guessing a character and location
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

		// Check for game win
		if (res.completionTime) {
			try {
				// Get leaderboard
				const leaderboard = await getLeaderboard(imageId);

				// Check if time qualifies
				const doesQualify = qualifiesForTopTen(leaderboard, res.completionTime);
				if (doesQualify) {
					setQualifies(true);
				}

				setGameOver(true);
			} catch (err) {
				console.error("Leaderboard fetch failed:", err);
			}
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

				{!session.completionTime && (
					<>
						<TargetCircle target={target} />
						<TargetMenu
							target={target}
							availableCharacters={availableCharacters}
							onGuess={handleGuess}
						/>
					</>
				)}
				<Markers markers={markers} />

				{gameOver && session?.completionTime != null && (
					<GameOver imageId={imageId} session={session} qualifies={qualifies} />
				)}
			</div>
		</>
	);
}
