import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [welcomeStatus, setWelcomeStatus] = useState(true);

    function logOut() {
        let toastId;
        toastId = toast.loading("waiting...");
        localStorage.removeItem("token");
        setTimeout(() => {
            toast.dismiss(toastId);
            window.location.href = "http://localhost:5173/";
            setToken(null);
            toast(<span className="text-darkPrimary ">Logged out</span>, {
                duration: 2000,
                position: "top-center",
                icon: (
                    <span className="bg-primary size-1 p-3 rounded-full flex justify-center items-center">
                        <i className="fa-solid fa-check text-white"></i>
                    </span>
                ),
            });
        }, 1300);
    }
    return (
        <>
            <userContext.Provider
                value={{
                    token,
                    setToken,
                    logOut,
                    welcomeStatus,
                    setWelcomeStatus,
                }}
            >
                {children}
            </userContext.Provider>
        </>
    );
}
