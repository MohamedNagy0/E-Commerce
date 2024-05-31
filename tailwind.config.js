/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            screens: {
                sm: "640px",

                md: "720",

                lg: "960px",

                xl: "1140px",

                "2xl": "1280",
            },
        },
        extend: {
            boxShadow: {
                myShadow:
                    "rgba(145, 158, 171, 0.2) 0px 2px 4px -1px, rgba(145, 158, 171, 0.14) 0px 4px 5px 0px, rgba(145, 158, 171, 0.12) 0px 1px 10px 0px",
            },
            colors: {
                primary: "#09c",
                light: "#f0f3f2",
                rating: "#ffc908",
            },
        },
    },
    plugins: [],
};
