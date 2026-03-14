import { createBrowserRouter } from "react-router";
import App from "../App.jsx";

import Home from "../pages/Home/Home.jsx";
import Leaderboard from "../pages/Leaderboard/Leaderboard.jsx";
import About from "../pages/About/About.jsx";
import SkiSlopes from "../pages/SkiSlopes/SkiSlopes.jsx";
import SugarFactory from "../pages/SugarFactory/SugarFactory.jsx";
import SpaceColony from "../pages/SpaceColony/SpaceColony.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "leaderboard", element: <Leaderboard /> },
			{ path: "about", element: <About /> },
			{ path: "ski-slopes", element: <SkiSlopes /> },
			{ path: "sugar-factory", element: <SugarFactory /> },
			{ path: "space-colony", element: <SpaceColony /> },
		],
	},
]);

export default router;
