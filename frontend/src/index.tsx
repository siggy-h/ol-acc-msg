import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import { client } from "./client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ToastContainer
                role="alert"
                transition={Slide}
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                theme="light"
            />
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
