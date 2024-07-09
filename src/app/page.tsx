import TodoList from "@/components/todo-list";
import { getAllTodos } from "@/lib";

export default async function Home() {
	const todos = await getAllTodos();
	return (
		<>
			<TodoList todos={todos} />
		</>
	);
}
