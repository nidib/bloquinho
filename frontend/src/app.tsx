import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { BloquinhoEditorPage } from './pages/bloquinho-editor-page';
import { HomePage } from './pages/home-page';


const router = createBrowserRouter([{
	path: '/',
	element: <HomePage />,
}, {
	path: '/:bloquinhoTitle',
	element: <BloquinhoEditorPage />,
}, {
	path: '*',
	element: <div>not found</div>,
}]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
