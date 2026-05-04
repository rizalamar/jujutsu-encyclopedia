import { useEffect, useState } from "react";
import type { JikanResponse } from "../@types";
import { getJJKCharacters } from "../services/character.service";
import { Link } from "react-router-dom";

export default function CharactersPage() {
	const [characters, setCharacters] = useState<JikanResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const data = await getJJKCharacters();
				setCharacters(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCharacters();
	}, []);

	return (
		<div className="">
			<h2 className="text-3xl font-bold mb-6">Sorcerers & Cursed Spirits</h2>
			{loading ? (
				<p>Loading characters...</p>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{characters?.data.map((char) => (
						<div key={char.character.mal_id} className="border p-2 rounded hover:shadow-lg transition">
							<img
								src={char.character.images.webp.image_url}
								alt={char.character.name}
								className="w-full aspect-3/4 object-cover"
							/>
							<p className="mt-2 font-semibold text-sm truncate">{char.character.name}</p>
							<Link to={`/characters/${char.character.mal_id}`}>Character detail</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
