import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh]">
			<h1 className="text-5xl font-bold mb-6 text-center">JJK Encyclopedia</h1>
			<p className="text-xl mb-8">Unlock the secrets of Cursed Energy</p>
			<Link
				to={"/characters"}
				className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
			>
				Enter the Archive
			</Link>
		</div>
	);
}
