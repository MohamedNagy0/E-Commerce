import React from "react";
import { Link } from "react-router-dom";

export default function BackButton() {
    return (
        <>
            <Link
                to="/"
                className="back-icon cursor-pointer size-[35px] rounded-full bg-primary flex justify-center items-center duration-300 hover:-translate-x-1 hover:scale-105"
            >
                <i className="fa-solid fa-arrow-left text-white"></i>
            </Link>
        </>
    );
}
