import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    function logOut() {
        let toastId;
        setToken(null);
        localStorage.removeItem("token");
        toastId = toast.loading("waiting...");
        setTimeout(() => {
            toast.dismiss(toastId);
            toast(<span className="text-darkPrimary ">Logged out</span>, {
                duration: 2000,
                position: "top-center",
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
            window.location.href = "http://localhost:5173/";
        }, 1000);
    }
    return (
        <>
            <userContext.Provider
                value={{
                    token,
                    setToken,
                    logOut,
                }}
            >
                {children}
            </userContext.Provider>
        </>
    );
}
