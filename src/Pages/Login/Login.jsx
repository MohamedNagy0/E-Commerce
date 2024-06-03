import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
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
                toast.dismiss(toastId);
                toast.success("Welcome to FreshCart");
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
            <div className="container w-full">
                <h2 className="text-primary font-bold text-3xl my-6">
                    <i className="fa-regular fa-user mr-2"></i>
                    <span>Login </span>
                </h2>
                <form
                    className="w-full flex flex-col gap-6"
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
                    <div className="flex justify-between items-center">
                        <button type="submit" className="btn-primary">
                            Log in
                        </button>
                        <Link
                            className="text-primary text-sm hover:underline"
                            to="/auth/forgotPassword"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
