"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TUser, ZUser } from "@/contracts";
import toast from "react-hot-toast";
import { useUserStore } from "@/hooks/store/useUserStore";

export const CreateUser = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<TUser>({
		resolver: zodResolver(ZUser),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			age: 0,
		},
	});

	const onSubmit = async (data: TUser) => {
		console.log("Form submitted with data:", data);
		setIsSubmitting(true);
		try {
			const newUser = {
				...data,
				id: data.id || uuidv4(),
			};

			await new Promise((resolve) => setTimeout(resolve, 1000));
			useUserStore.getState().createUser(newUser);

			console.log("User created:", newUser);

			toast.success(
				`Successfully created ${newUser.first_name} ${newUser.last_name}`
			);

			form.reset();
		} catch (error) {
			console.error("Error creating user:", error);
			toast("Failed to create user. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex justify-center w-full py-6">
			<Card className="w-full max-w-md border border-indigo-100 shadow-lg">
				<CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
					<CardTitle className="text-2xl font-bold">Create User</CardTitle>
					<CardDescription className="text-indigo-100">
						Enter the details to register a new user
					</CardDescription>
				</CardHeader>

				<CardContent className="pt-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-indigo-800">
											First Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter first name"
												{...field}
												className="border-indigo-200 focus-visible:ring-indigo-500"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-indigo-800">Last Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter last name"
												{...field}
												className="border-indigo-200 focus-visible:ring-indigo-500"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-indigo-800">Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="your.email@example.com"
												{...field}
												className="border-indigo-200 focus-visible:ring-indigo-500"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-indigo-800">Age</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter age"
												{...field}
												value={field.value || ""}
												onChange={(e) => {
													const value = e.target.value
														? parseInt(e.target.value, 10)
														: "";
													field.onChange(value);
												}}
												className="border-indigo-200 focus-visible:ring-indigo-500"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>
							<div className="pt-2">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2"
								>
									{isSubmitting ? "Creating..." : "Create User"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
