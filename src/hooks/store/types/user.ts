import { IUser, TUser } from "@/contracts";


//convert type to interface

export interface IUserState extends IUser{}

export interface IUserActions {
	createUser: (user: IUserState) => void;
	updateUser: (user: Partial<Omit<TUser, 'id'>>) => void;
	deleteUser: (id: string) => void;
	getUser: (id: string) => IUserState;
	getUsers: () => IUserState[];
	resetUserState: () => void;
}
