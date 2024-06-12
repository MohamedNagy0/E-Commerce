import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/User.context";
export default function Login() {
    const { token, setToken } = useContext(userContext);
    let navigate = useNavigate();
    function clearInputs() {
        formik.values.password = "";
    }

    async function formSubmit(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                data: values,
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);

            if (data.message == "success") {
                localStorage.setItem("token", data.token);
                setToken(localStorage.getItem("token"));
                toast.dismiss(toastId);
                toast(
                    <span className="text-darkPrimary ">
                        Welcome{" "}
                        <span className="font-bold">{data.user.name}</span>
                    </span>,
                    {
                        duration: 2000,
                        position: "top-center",
                        icon: (
                            <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                                <i className="fa-solid fa-check text-white"></i>
                            </span>
                        ),
                    }
                );
                navigate("/");
            }
        } catch (error) {
            clearInputs();
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: formSubmit,
    });
    return (
        <>
            <div className="container w-full max-md:px-6 max-w-[535px]">
                <h2 className="text-primary font-bold text-3xl my-6 text-center">
                    <i className="fa-regular fa-user mr-2"></i>
                    <span>Login </span>
                </h2>
                <form
                    className="w-full flex flex-col gap-5 "
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter Your Email"
                        />
                    </div>

                    <div>
                        <input
                            className="form-control w-full"
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Enter Your Password"
                        />
                    </div>

                    <div className="flex flex-col gap-4 justify-between items-center">
                        <button type="submit" className="btn-primary w-full">
                            Log in
                        </button>
                        <Link
                            className="text-primary text-sm hover:underline"
                            to="/auth/forgotPassword"
                        >
                            Forgot your password?
                        </Link>
                        <div>
                            <Link
                                to="/auth/register"
                                className="btn-primary text-sm "
                            >
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
