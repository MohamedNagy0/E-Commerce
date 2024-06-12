import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import Categories from "./Pages/Categories/Categories";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Products from "./Pages/Products/Products";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";
import CategoriesDetails from "./Pages/CategoriesDetails/CategoriesDetails";
import AllOrders from "./Pages/AllOrders/AllOrders";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Home />,
                },

                { path: "/products", element: <Products /> },
                { path: "/product/:productId", element: <ProductDetails /> },
                { path: "/categories", element: <Categories /> },
                {
                    path: "/categories/:categoryId",
                    element: <CategoriesDetails />,
                },
                { path: "/brands", element: <Brands /> },
                { path: "/cart", element: <Cart /> },
                { path: "/allorders", element: <AllOrders /> },
                {
                    path: "*",
                    element: <NotFound />,
                },
                "details",
            ],
        },
        {
            path: "/auth",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "forgotPassword",
                    element: <ForgotPassword />,
                },
                {
                    path: "verifyCode",
                    element: <VerifyCode />,
                },
            ],
        },
    ]);
    return (
        <>
            <UserProvider>
                <CartProvider>
                    <RouterProvider router={routes}></RouterProvider>
                    <Toaster />
                </CartProvider>
            </UserProvider>
        </>
    );
}

export default App;
