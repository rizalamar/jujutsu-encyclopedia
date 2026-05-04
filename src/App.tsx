import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";

function App() {
	return (
		<Router>
			<main className="max-w-7xl mx-auto px-4 py-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/characters" element={<CharactersPage />} />
					<Route path="/characters/:id" element={<CharacterDetailPage />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
