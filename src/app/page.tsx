import TodoList from "@/components/todo-list";
import { getAllTodos } from "@/lib";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default async function Home() {
	const todos = await getAllTodos();
	return (
		<>
				<TodoList todos={todos} />
		</>
	);
}
