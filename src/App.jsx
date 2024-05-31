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

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/categories/:categoryID", element: <Categories /> },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/forgotPassword",
                    element: <ForgotPassword />,
                },
                {
                    path: "/verifyCode",
                    element: <VerifyCode />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
        </>
    );
}

export default App;
