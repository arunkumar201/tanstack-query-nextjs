// in react query , always create query factory for each query and avoid hardcoding or errors.
export const TodoQueryKeys = {
	all: ["todos"] as const,
	byId: (id: string) => ["todos",id] as const,
	byUserId: (userId: string) => ["todos","byUserId",userId] as const,
	lists: () => [...TodoQueryKeys.all,"lists"] as const,
	list: (filters: string) => [...TodoQueryKeys.lists(),{ filters }] as const,
};
