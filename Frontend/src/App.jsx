import Announcements from "./components/Announcements";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";

function App() {
  const Layout = () => {
    return <>
      <div>
        <Announcements />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      </>
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/orders",
          element: <Order/>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/create-account",
          element: <Register />,
        },
        {
          path: "/products/:search",
          element: <ProductList />,
        }, {
          path: "/myAccount",
          element: <Account />,
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;