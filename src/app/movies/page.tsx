import MoviesList from "@/components/MoviesList";

const Movies = async () => {
	const delay = await new Promise((resolve) => setTimeout(resolve, 9000));
	return (
		<>
			<div>
				<h1>Movies List</h1>
				<MoviesList />
			</div>
		</>
	);
};

export default Movies;
