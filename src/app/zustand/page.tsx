import { CreateUser } from "./components/create-user";
import { UserList } from "./components/user-list";

const ZustandDemoPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 md:p-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
					User Management System
				</h1>

				<div className="grid md:grid-cols-2 gap-2">
					<div className="md:col-span-1">
						<CreateUser />
					</div>

					<div className="flex-1">
						<UserList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ZustandDemoPage;
