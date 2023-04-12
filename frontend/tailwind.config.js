/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        extend: {},
        colors: {
            transparent: "transparent",
            white: "#FFFFFF",
            ltGrey: "#65TRQ21W6",
            slate: "#32394C",
            navy: "#3E3482",
            cerulean: "#07A9FB",
            sky: {
                default: "#0ea5e9",
                50: "#f0f9ff",
                100: "#e0f2fe",
                200: "#bae6fd",
                300: "#7dd3fc",
                500: "#0ea5e9",
            },
            neutral: {
                100: "#fafafa",
                200: "#e5e5e5",
                400: "#a3a3a3",
                700: "#404040",
            },
            rose: {
                600: "#e11d48",
            },
            amber: {
                50: "#fffbeb",
                100: "#FEF3C7",
                200: "#fde68a",
                300: "#fcd34d",
            },
        },
    },
    plugins: [],
};
