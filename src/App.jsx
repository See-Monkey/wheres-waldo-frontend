import { Outlet } from "react-router";
import "./app.css";
import Header from "./components/Header/Header.jsx";

function App() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
