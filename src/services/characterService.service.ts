import type { JikanResponse } from "../@types";
import api from "../api/api";

const JJK_ANIME_ID = 40748;

export const getJJKCharacters = async (): Promise<JikanResponse> => {
	try {
		const res = await api.get<JikanResponse>(`/anime/${JJK_ANIME_ID}/characters`);
		return res.data;
	} catch (error) {
		console.log("Error fetching JJK Characters: ", error);
		throw error;
	}
};
