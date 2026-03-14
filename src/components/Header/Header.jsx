import { NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.logoContainer}>
					<h1 className={styles.logoWheres}>WHERE'S</h1>
					<h1 className={styles.logoWaldo}>WALDO?</h1>
				</div>
				<nav className={styles.headerNav}>
					<NavLink
						to="/"
						end
						className={({ isActive }) => (isActive ? styles.hidden : undefined)}
					>
						Home
					</NavLink>
					<NavLink
						to="/leaderboard"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						Leaderboard
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? styles.active : undefined)}
					>
						About
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
