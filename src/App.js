import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './components/RootPage';
import GeneralApp from './components/GeneralApp';

const routes = [
  {
    path: '/',
    element: <RootPage />,
    children: [
      { index: true, element: <GeneralApp/> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {

  return <RouterProvider router={router}/>;
}

export default App;