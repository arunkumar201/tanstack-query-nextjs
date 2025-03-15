import { StateCreator } from "zustand";
import { IUserActions, IUserState } from "../types";
import { IUserStore } from "../useUserStore";


export const userActions: StateCreator<IUserStore, [], [], IUserActions> = (
	set,
	get
) => ({
	createUser: (user: IUserState) => {
		set((state) => ({
			users: [...state.users, user],
		}));
	},
	updateUser: (user: Partial<IUserState>) => {
		set((state) => ({
			users: state.users.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
		}));
	},
	deleteUser: (id: string) => {
		set((state) => ({
			users: state.users.filter((u) => u.id !== id),
		}));
	},
	getUser: (id: string) => {
		const user = get().users.find((u) => u.id === id);
		return user || ({} as IUserState);
	},
	getUsers: () => {
		return get().users;
	},

	resetUserState: () =>
		set((state) => ({ ...state, users: [...state.initialUserState] })),
});
