import TodoList from "@/components/todo-list";
import { getAllTodos } from "@/lib";
import { Suspense } from "react";

export default async function Home() {
	const todos = await getAllTodos();
	return (
		<>
			<TodoList todos={todos} />
		</>
	);
}
