"use client";

import { ITodos } from "@/lib/client_data_fetching/types";
import React from "react";
import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";
import { useTodosQuery } from "@/hooks/queries/useTodosQuery";
import Link from "next/link";

interface TodoListProps {
	todos: ITodos[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	const { data, error, isLoading } = useTodosQuery({ initialData: todos });
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<div className="mt-8">
			<Link href={"/movies"} className="mt-8">
				Go to Movies
			</Link>
			<ul className="space-y-4">
				{data && data?.map((todo) => <Todo key={todo.id} {...todo} />)}
			</ul>
		</div>
	);
};

export default TodoList;
