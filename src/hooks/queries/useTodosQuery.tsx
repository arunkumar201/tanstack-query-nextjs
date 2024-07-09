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
		staleTime: 1000 * 60 * 3, // 3 minutes
		initialData,
	});
}
