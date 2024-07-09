import React from "react";

interface ITodo {
	id: number;
	title: string;
	completed: boolean;
}

const Todo: React.FC<ITodo> = ({ id, title, completed }) => {
	return (
		<div
			className={`p-4 rounded-lg shadow-md  ${
				completed ? "bg-green-200" : "bg-yellow-200"
			} hover:bg-blue-200`}
		>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">ID: {id}</p>
			<p className="text-sm text-gray-500">
				Status: {completed ? "Completed" : "Incomplete"}
			</p>
		</div>
	);
};

export default Todo;
