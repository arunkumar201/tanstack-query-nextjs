"use server";

import { unstable_cache } from "next/cache";
import { TMovie } from "./types/movie";

const API_URL = "https://api.themoviedb.org/3/discover/movie"

export const getMovies = async (params: number) => {
	console.log(`Fetching movies for page ${params}`);
	return unstable_cache(async () => {
		const res = await fetch(`${API_URL}?page=${1}`,{
			method: "GET",
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`
			}


		});
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		console.log(`Fetched ${JSON.stringify(data)} movies for page ${params}`);
		return data.results as TMovie;
		// Cache the results for 30 days
	},[`getMovies-${params}`],{
		revalidate: 60 * 1000 * 60 * 24 * 30,
	})();
};
