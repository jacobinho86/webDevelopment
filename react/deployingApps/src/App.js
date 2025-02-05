import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from 'react';
//import BlogPage, { loader as postsLoader } from './pages/Blog'; //BlogPage component imported eagerly
import HomePage from './pages/Home';
//import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

//lazy loading means to load the components as needed, not monolithicaly as usual

const BlogPage = lazy(() => import('./pages/Blog')); //BlogPage imported lazyly, the function wraps the promise that import returns
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>, loader: () => import('./pages/Blog').then(module => module.loader()) }, //import loader lazyly
          { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: (meta) => import('./pages/Post').then(module => module.loader(meta)) },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
