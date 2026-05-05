import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { JikanDetailResponse } from "../@types";
import { techniquesData } from "../data/techniques";
import { getCharacterById } from "../services/character.service";

export default function CharacterDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [character, setCharacter] = useState<JikanDetailResponse | null>(null);
	const [loading, setLoading] = useState(true);

	const myTechniques = techniquesData.filter((t) => t.character_id === Number(id));

	useEffect(() => {
		const fetchCharacterDetail = async () => {
			if (!id) return;
			try {
				const data = await getCharacterById(id);
				setCharacter(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCharacterDetail();
	}, [id]);

	if (loading) return <p className="p-8">Searching archive...</p>;
	if (!character) return <p className="p-8">Character not found.</p>;

	return (
		<div className="p-8">
			<Link to={"/characters"} className="text-blue-500 mb-6 inline-block">
				⬅︎ Back to List
			</Link>

			<div className="flex flex-col md:flex-row gap-8">
				<img
					src={character.data.images.webp.image_url}
					alt={character.data.name}
					className="w-64 rounded-lg shadow-2xl"
				/>

				<div className="">
					<h2 className="text-4xl font-bold mb-2">{character.data.name}</h2>
					<p className="text-xl text-gray-500">{character.data.name_kanji}</p>
					<h3 className="text-xl font-bold mt-6 mb-3 text-indigo-600">Cursed Techniques</h3>
					{myTechniques.length > 0 ? (
						<ul className="space-y-3">
							{myTechniques.map((t) => (
								<li key={t.id} className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50">
									<p className="font-bold">
										{t.name}{" "}
										<span className="text-xs bg-indigo-100 px-2 py-1 rounded">{t.type}</span>
									</p>
									<p className="text-sm text-gray-600">{t.description}</p>
								</li>
							))}
						</ul>
					) : (
						<p className="italic text-gray-400">No techniques recorded in local archive yet.</p>
					)}
				</div>
			</div>
		</div>
	);
}
