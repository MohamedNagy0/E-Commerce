import axios from "axios";
import { Formik, useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    let navigate = useNavigate();

    function clearInputs() {
        formik.values.email = "";
    }

    async function formSubmit(values) {
        let toastId;

        try {
            const options = {
                method: "POST",
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                data: values,
            };
            toastId = toast.loading("Waiting...");

            const { data } = await axios.request(options);
            console.log(data);
            if (data.statusMsg == "success") {
                toast.dismiss(toastId);
                toast.success(data.message);
                navigate("/verifyCode");
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
        },
        onSubmit: formSubmit,
    });
    return (
        <>
            <section className="flex flex-col justify-center items-center gap-8 mt-12">
                <header className="flex flex-col gap-4 text-center">
                    <h2 className="font-extrabold text-primary text-2xl">
                        Forgot your password?
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Your password will be reset by email.
                    </p>
                </header>
                <form onSubmit={formik.handleSubmit}>
                    <label
                        className="text-left text-xs font-bold text-gray-600"
                        htmlFor="email"
                    >
                        Enter your email address
                    </label>
                    <div className="mt-1 mb-5">
                        <input
                            // autoComplete="off"
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <footer className="text-center">
                        <button
                            type="submit"
                            className="btn-primary w-full py-1"
                        >
                            Next
                        </button>
                        <Link
                            className="text-xs text-primary font-bold inline-block mt-4 hover:underline"
                            to="/login"
                        >
                            Back to log in
                        </Link>
                    </footer>
                </form>
            </section>
        </>
    );
}
