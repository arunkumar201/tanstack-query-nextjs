import { useMutation,useQueryClient } from "@tanstack/react-query"

export const useDeleteTodo = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			await fetch(`/api/todos/${id}`,{
				method: "DELETE",
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["todos","getAllTodos"],
			});
		},
		onError: (err: Error) => {
			console.error("Failed to delete todo:",err)
		},
	}
	)
}
