import { ITodos } from "./types";

//get Todos from the API
export const getAllTodos = async () => {

	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	//wait()
	// await new Promise(resolve => setTimeout(resolve,5000)); // simulate delay for
	const data = await response.json();
	return data as ITodos[];

}
