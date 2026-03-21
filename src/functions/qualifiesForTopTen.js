export default function qualifiesForTopTen(leaderboard, time) {
	return (
		leaderboard.length < 10 ||
		time < leaderboard[leaderboard.length - 1].completionTime
	);
}
