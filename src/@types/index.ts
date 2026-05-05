export interface Technique {
	id: number;
	character_id: number;
	name: string;
	description: string;
	type: string;
}

interface Person {
	mal_id: number;
	url: string;
	images: {
		jpg: {
			image_url: string;
		};
	};
	name: string;
}

interface VoiceActors {
	person: Person;
	language: string;
}

export interface JikanCharacter {
	character: {
		mal_id: number;
		url: string;
		images: {
			webp: {
				image_url: string;
				small_image_url: string;
			};
		};
		name: string;
	};
	role: string;
	voice_actors: VoiceActors[];
}

export interface JikanResponse {
	data: JikanCharacter[];
}

export interface JikanCharacterDetail {
	mal_id: number;
	url: string;
	images: {
		webp: {
			image_url: string;
			small_image_url: string;
		};
	};
	name: string;
	name_kanji: string;
	about: string;
}

export interface JikanDetailResponse {
	data: JikanCharacterDetail;
}
