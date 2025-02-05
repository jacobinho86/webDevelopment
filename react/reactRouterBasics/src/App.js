import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />, 
    children: [
      {index: true, element: <HomePage />}, //index means that this is the default page of the parent route
      {path: '/products', element: <ProductsPage />},
      {path: '/products/:productId', element: <ProductDetailPage />}, //this is a route parameter id (after de colon), that part is dynamic
    ]
  }
  
]);

function App() {
  //this propr is a router created by createbrowserrouter
  return <RouterProvider router={router}/>;
}

export default App;
