"use client";

import { useShallow } from "zustand/react/shallow";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/store/useUserStore";
import toast from "react-hot-toast";

export const UserList = () => {
	const users = useUserStore(useShallow((state) => state.users));

	return (
		<Card className="w-full shadow-lg border border-indigo-100">
			<CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div>
						<CardTitle className="text-2xl font-bold">User Directory</CardTitle>
						<CardDescription className="text-indigo-100">
							Managing {users.length} registered user{users.length !== 1 && "s"}
						</CardDescription>
					</div>

					{/* <div className="flex gap-2">
						<Button
							variant="secondary"
							className="bg-white text-indigo-700 hover:bg-indigo-100"
							size="sm"
						>
							<UserPlus className="mr-1 h-4 w-4" />
							Add User
						</Button>
					</div> */}
				</div>
			</CardHeader>

			<CardContent className="p-6">
				{users.length > 0 ? (
					<div className="rounded-md border border-indigo-100 overflow-hidden">
						<Table>
							<TableHeader className="bg-indigo-50">
								<TableRow>
									<TableHead className="font-semibold text-indigo-800 cursor-pointer hover:bg-indigo-100">
										First Name
									</TableHead>
									<TableHead className="font-semibold text-indigo-800 cursor-pointer hover:bg-indigo-100">
										Last Name
									</TableHead>
									<TableHead className="font-semibold text-indigo-800 cursor-pointer hover:bg-indigo-100">
										Email
									</TableHead>
									<TableHead className="font-semibold text-indigo-800 cursor-pointer hover:bg-indigo-100">
										Age
									</TableHead>
									<TableHead className="font-semibold text-indigo-800">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => (
									<TableRow key={user.id}>
										<TableCell className="px-4 py-2">
											{user.first_name && user?.first_name}
										</TableCell>
										<TableCell className="px-4 py-2">
											{user?.last_name}
										</TableCell>
										<TableCell className="px-4 py-2">{user.email}</TableCell>
										<TableCell className="px-4 py-2">{user.age}</TableCell>
										<TableCell className="px-4 py-2">
											<Button
												variant="destructive"
												size="sm"
												onClick={() => {
													if (!user.id) {
														console.log("No user ID found");
														return;
													}
													useUserStore.getState().deleteUser(user.id);
													toast.success(
														`User ${user.first_name} ${user.last_name} deleted successfully`
													);
												}}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				) : (
					<div className="text-center py-6 text-gray-600">No users found.</div>
				)}
			</CardContent>
		</Card>
	);
};
