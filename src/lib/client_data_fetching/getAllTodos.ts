import { ITodos } from "./types";

//get Todos from the API
export const getAllTodos = async () => {

	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data as ITodos[];

}
