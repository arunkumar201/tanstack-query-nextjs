import { getAllTodos } from "@/lib";
import { ITodos } from "@/lib/client_data_fetching/types";
import { useQuery } from "@tanstack/react-query";

export interface IUseTodosQuery {
	initialData: ITodos[] | null;
}
export function useTodosQuery({ initialData }: IUseTodosQuery) {
	return useQuery({
		queryKey: ["todos", "getAllTodos"],
		queryFn: () => getAllTodos(),
		retry: 3,
		select: (data) => data?.filter((data) => data.id % 2 === 0),
		// ✅ globally default to 20 seconds
		staleTime: 1000 * 20,
		initialData,
		// placeholderData: [
		// 	{ id: 0, title: "Loading...", completed: false, userId: 10 },
		// ],
	});
}
