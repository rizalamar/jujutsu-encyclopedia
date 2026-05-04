import { useEffect, useState } from "react";
import type { JikanResponse, Technique } from "./@types";
import { techniquesData } from "./data/techniques";
import { getJJKCharacters } from "./services/character.service";

function App() {
	const [characters, setCharacters] = useState<JikanResponse | null>(null);
	const [techniques] = useState<Technique[]>(techniquesData);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getJJKCharacters();
				setCharacters(data);
				console.log("API Characters: ", data.data);
				console.log("Local Technique: ", techniques);

				const gojo = data.data.find((c) => c.character.name.toLowerCase().includes("gojo"));
				if (gojo) {
					const gojoTechnique = techniques.filter((t) => t.character_id === 1);
					console.log(`Techniques for ${gojo.character.name}:`, gojoTechnique);
				}
			} catch (error) {
				console.error("Failed to fetch data: ", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [techniques]);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-4">Jujutsu kaisen Intelligence System</h1>

			{loading ? (
				<p>Loading Cursed Energy...</p>
			) : (
				<div className="grid gap-4">
					<p className="text-green-500">{characters?.data.length ?? 0} Characters</p>
					<p className="text-blue-500">{techniques.length} Local Techniques</p>
				</div>
			)}
		</div>
	);
}

export default App;
