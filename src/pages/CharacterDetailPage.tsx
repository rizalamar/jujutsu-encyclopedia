import { Link, useParams } from "react-router-dom";

export default function CharacterDetailPage() {
	const { id } = useParams();
	return (
		<div>
			<Link to={"/characters"}>⬅︎ Back to List</Link>
			<h2>(ID: {id})</h2>
			<p>Soon: we will merge Jikan API and local techniques data here!</p>
		</div>
	);
}
