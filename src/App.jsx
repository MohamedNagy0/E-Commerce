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
import Products from "./Pages/Products/Products";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";
import CategoriesDetails from "./Pages/CategoriesDetails/CategoriesDetails";
import AllOrders from "./Pages/AllOrders/AllOrders";
import ProtectedAuth from "./Components/Protect/ProtectedAuth/ProtectedAuth";
import ProtectedCart from "./Components/Protect/ProtectedCart/ProtectedCart";
import ProtectedAllOrders from "./Components/Protect/ProtectedAllOrders/ProtectedAllOrders";
import { useState } from "react";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import BrandsDetails from "./Pages/BrandsDetails/BrandsDetails";

function App() {
    const [theme, setTheme] = useState("light");

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },

                { path: "/products", element: <Products /> },
                { path: "/product/:productId", element: <ProductDetails /> },
                { path: "/categories", element: <Categories /> },
                {
                    path: "/category/:categoryId",
                    element: <CategoriesDetails />,
                },
                {
                    path: "/brand/:brandId",
                    element: <BrandsDetails />,
                },
                { path: "/brands", element: <Brands /> },
                {
                    path: "/cart",
                    element: (
                        <ProtectedCart>
                            <Cart />
                        </ProtectedCart>
                    ),
                },
                {
                    path: "/allorders",
                    element: (
                        <ProtectedAllOrders>
                            <AllOrders />
                        </ProtectedAllOrders>
                    ),
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
                "details",
            ],
        },
        {
            path: "/auth",
            element: (
                <ProtectedAuth>
                    <Layout />
                </ProtectedAuth>
            ),
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
                {
                    path: "resetPassword",
                    element: <ResetPassword />,
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
