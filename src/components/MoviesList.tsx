"use client";

import { getMovies } from "@/actions";
import { TMovie } from "@/actions/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import MoviesCart from "./MoviesCart";

const MoviesList = () => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["MoviesList"],
		queryFn: async ({ pageParam }) => {
			const res = await getMovies(pageParam);
			return res;
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => lastPage.page + 1,
	});

	console.debug("🚀 ~ MoviesList ~ data:", data);

	return (
		<div>
			<h1>Movies List</h1>
			{status === "pending" && <p>Loading...</p>}
			{status === "error" && <p>Error: {error.message}</p>}
			{status === "success" && (
				<div>
					{data.pages.map((movie, index) => {
						return (
							<div
								key={index}
								className="flex justify-center w-full flex-wrap gap-4 max-h-[100px] absolute mt-12"
							>
								{movie.map((movie, index) => {
									return (
										<div key={index} className="">
											<MoviesCart movie={movie} />
										</div>
									);
								})}
							</div>
						);
					})}
					<div>
						<button
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
						>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
								? "Load More"
								: "No more movies"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MoviesList;
