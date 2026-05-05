import type { JikanDetailResponse, JikanResponse } from "../@types";
import api from "../api/api";

const JJK_ANIME_ID = 40748;

export const getAllCharacters = async (): Promise<JikanResponse> => {
	try {
		const res = await api.get<JikanResponse>(`/anime/${JJK_ANIME_ID}/characters`);
		return res.data;
	} catch (error) {
		console.log("Error fetching JJK Characters: ", error);
		throw error;
	}
};

export const getCharacterById = async (id: string): Promise<JikanDetailResponse> => {
	try {
		const res = await api.get<JikanDetailResponse>(`/characters/${id}`);
		return res.data;
	} catch (error) {
		console.error("Error fetching character detail: ", error);
		throw error;
	}
};
