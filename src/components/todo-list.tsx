"use client";

import { ITodos } from "@/lib/client_data_fetching/types";
import React from "react";
import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";
import { useTodosQuery } from "@/hooks/queries/useTodosQuery";

interface TodoListProps {
	todos: ITodos[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	const { data, error, isLoading } = useTodosQuery({ initialData: todos });
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<ul className="space-y-4">
			{todos.map((todo) => (
				<Todo key={todo.id} {...todo} />
			))}
		</ul>
	);
};

export default TodoList;
