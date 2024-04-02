import { LOGIN_PAGE } from "../common/data/meta.data";
import { Metadata } from "next";
import LoginPage from "./components/LoginPage";
import { getPublicBasePath } from "../helper/basePath";

export const metadata: Metadata = {
    title: LOGIN_PAGE.title,
    description: LOGIN_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
        },
    ],
};

const Login = () => {
    return (
        <>
            <LoginPage />
        </>
    );
};

export default Login;
