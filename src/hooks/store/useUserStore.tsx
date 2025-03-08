"use client";

import { create } from "zustand";
import { IUserActions, IUserState } from "./types";
import {
	devtools,
	persist,
	combine,
	subscribeWithSelector,
	createJSONStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { userActions } from "./actions";

export interface IUserStore {
	users: IUserState[];
	initialUserState: IUserState[];
}

export interface IUserStore {
	users: IUserState[];
}

const initialUsers = [
	{
		id: "1",
		first_name: "John",
		last_name: "Doe",
		email: "john@example.com",
		age: 30,
	},
	{
		id: "2",
		first_name: "Jane",
		last_name: "Smith",
		email: "jane@example.com",
		age: 25,
	},
];

const initialUserState: IUserStore = {
	users: [],
	initialUserState: initialUsers,
};

export const useUserStore = create<IUserStore & IUserActions>()(
	persist(
		devtools(
			subscribeWithSelector(immer(combine(initialUserState, userActions)))
		),
		{
			name: "user-store",
			version: 1,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				users: state.users,
			}),
			onRehydrateStorage: () => (state) => {
				if (state && !state?.users?.length) {
					state.users = initialUsers;
				}
			},
		}
	)
);
