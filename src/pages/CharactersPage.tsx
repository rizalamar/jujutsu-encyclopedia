import { useEffect, useMemo, useState } from "react";
import type { JikanResponse } from "../@types";
import { getAllCharacters } from "../services/character.service";
import { Link, useSearchParams } from "react-router-dom";

export default function CharactersPage() {
	const [characters, setCharacters] = useState<JikanResponse | null>(null);
	const [loading, setLoading] = useState(true);

	const [searchParams, setSearchParams] = useSearchParams();
	const roleFilter = searchParams.get("role") || "All";
	const currentPage = parseInt(searchParams.get("page") || "1");
	const ITEMS_PER_PAGE = 20;

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const data = await getAllCharacters();
				setCharacters(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchCharacters();
	}, []);

	const handleFilterChange = (role: string) => {
		if (role === "All") {
			searchParams.delete("role");
		} else {
			searchParams.set("role", role);
		}
		setSearchParams(searchParams);
	};

	const filteredCharacters = useMemo(() => {
		if (!characters) return [];
		if (roleFilter === "All") return characters.data;
		return characters.data.filter((char) => char.role === roleFilter);
	}, [characters, roleFilter]);

	const paginatedCharacters = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // page 2 startIndex = 20
		return filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE); // page 2 20, 40
	}, [currentPage, filteredCharacters]);

	const goToPage = (page: number) => {
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

	return (
		<div className="">
			<h2 className="text-3xl font-bold mb-6">Sorcerers & Cursed Spirits</h2>

			<div className="flex gap-2 mb-8">
				{["All", "Main", "Supporting"].map((role) => (
					<button
						key={role}
						onClick={() => handleFilterChange(role)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
							roleFilter === role
								? "bg-indigo-600 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						{role}
					</button>
				))}
			</div>

			{loading ? (
				<p>Loading characters...</p>
			) : (
				<>
					{/* Character cards */}
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{paginatedCharacters.map((char) => (
							<div key={char.character.mal_id} className="border p-2 rounded hover:shadow-lg transition">
								<img
									src={char.character.images.webp.image_url}
									alt={char.character.name}
									className="w-full aspect-3/4 object-cover"
								/>
								<p className="mt-2 font-semibold text-sm truncate">{char.character.name}</p>
								<Link
									to={`/character/${char.character.mal_id}`}
									className="bg-amber-500 px-3 py-1 text-xs"
								>
									Character detail
								</Link>
							</div>
						))}
					</div>

					{/* Pagination */}
					{filteredCharacters.length > 20 && (
						<div className="mt-12 flex justify-center items-center gap-4">
							<button
								disabled={currentPage === 1}
								onClick={() => goToPage(currentPage - 1)}
								className="px-4 py-2 border rounded disabled:opacity-30 cursor-pointer"
							>
								Previous
							</button>

							<span className="text-sm font-medium">
								Page {currentPage} of {totalPages}
							</span>

							<button
								disabled={currentPage === totalPages}
								onClick={() => goToPage(currentPage + 1)}
								className="px-4 py-2 border rounded disabled:opacity-30 cursor-pointer"
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
