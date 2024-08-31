import { Result } from "@/actions/types/movie";
import Image from "next/image";

const MoviesCart = ({ movie }: { movie: Result }) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
				width={100}
				height={100}
				className="w-full h-[400px]"
			/>
			<div className="px-6 py-4">
				<h2 className="font-bold text-xl mb-2">{movie.title}</h2>
				<p className="text-gray-700 text-base">{movie.overview}</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				<div>
					<p className="text-gray-700 text-sm">Votes</p>
					<h1>{movie.vote_count}</h1>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-gray-700 text-sm">Rating</p>
					<h1>{movie.vote_average}</h1>
				</div>
			</div>
		</div>
	);
};

export default MoviesCart;
