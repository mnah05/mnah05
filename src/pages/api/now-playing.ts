import type { APIRoute } from "astro";

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

interface SpotifyTrack {
	is_playing: boolean;
	item: {
		name: string;
		artists: { name: string }[];
		album: { name: string; images: { url: string }[] };
		external_urls: { spotify: string };
	};
}

interface TrackResponse {
	isPlaying: boolean;
	title: string;
	artist: string;
	album: string;
	albumImage: string;
	songUrl: string;
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
	const basic = btoa(`${clientId}:${clientSecret}`);
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}).toString(),
	});

	const data = await response.json() as { access_token: string };
	return data.access_token;
}

async function getNowPlaying(accessToken: string): Promise<TrackResponse | null> {
	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	if (response.status === 204 || response.status > 400) {
		return null;
	}

	const data = await response.json() as SpotifyTrack;

	if (!data.is_playing || !data.item) {
		return null;
	}

	return {
		isPlaying: true,
		title: data.item.name,
		artist: data.item.artists.map((a) => a.name).join(", "),
		album: data.item.album.name,
		albumImage: data.item.album.images[0]?.url ?? "",
		songUrl: data.item.external_urls.spotify,
	};
}

export const GET: APIRoute = async ({ locals }) => {
	const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
	const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
	const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

	if (!clientId || !clientSecret || !refreshToken) {
		return new Response(JSON.stringify({ isPlaying: false }), {
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
		const track = await getNowPlaying(accessToken);
		return new Response(JSON.stringify(track ?? { isPlaying: false }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		return new Response(JSON.stringify({ isPlaying: false }), {
			headers: { "Content-Type": "application/json" },
		});
	}
};
