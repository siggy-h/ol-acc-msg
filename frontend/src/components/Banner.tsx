import React from "react";
import Heading from "./Heading";
import logo from "../logo-H.jpg";

const Banner = () => {
    return (
        <header className="sm:flex items-center p-2 bg-ltGrey h-1/6">
            <img
                src={logo}
                alt="Paper Sales Company"
                className="h-auto max-w-[60%] sm:max-w-[40%] pr-10 flex-none"
            />
            <Heading type="h1">Sales Agent Tool</Heading>
        </header>
    );
};

export default Banner;
