import { z } from "zod";

export const ZUser = z.object({
	id: z.string().optional(),
	first_name: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	last_name: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	age: z.number().min(1, {
		message: "Age must be at least 1.",
	}),
});

export type TUser = z.infer<typeof ZUser>;
export interface IUser extends TUser {}
