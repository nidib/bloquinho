import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { BloquinhoEditorPage } from './pages/bloquinho-editor-page';
import { HomePage } from './pages/home-page';
import { MaintenancePage } from './pages/mainetance';

function App() {
	const routes = getRoutes();
	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
}

function getRoutes(): RouteObject[] {
	const isUnderMaintenance = import.meta.env.MAINTENANCE ?? false;

	if (isUnderMaintenance) {
		return [{ path: '*', element: <MaintenancePage /> }];
	}

	return [
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/:title',
			element: <BloquinhoEditorPage />,
		},
		{
			path: '*',
			element: <div>not found</div>,
		},
	];
}

export default App;
