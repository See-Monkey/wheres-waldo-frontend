import { Link } from "react-router";
import styles from "./About.module.css";
import githubLogo from "../../images/github.svg";

export default function About() {
	return (
		<main className={styles.aboutPage}>
			<h1>Created by See-Monkey for The Odin Project</h1>
			<h2>Tech Stack</h2>

			<div className={styles.content}>
				<h3>Backend</h3>

				<ul>
					<li>Node.js</li>
					<li>Express</li>
					<li>PostgreSQL</li>
					<li>Prisma ORM</li>
					<li>Jest + Supertest</li>
				</ul>

				<Link to="https://github.com/See-Monkey/wheres-waldo-backend">
					<img src={githubLogo} alt="Github" className={styles.githubLogo} />
				</Link>
			</div>

			<div className={styles.content}>
				<h3>Frontend</h3>

				<ul>
					<li>React</li>
					<li>Vite</li>
					<li>React Router</li>
					<li>Vitest</li>
					<li>CSS Modules</li>
				</ul>

				<Link to="https://github.com/See-Monkey/wheres-waldo-frontend">
					<img src={githubLogo} alt="Github" className={styles.githubLogo} />
				</Link>
			</div>
		</main>
	);
}
