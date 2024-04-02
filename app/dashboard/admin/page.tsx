import { Metadata } from "next";
import AdminPage from "./components/AdminPage";
import { ADMIN_PAGE } from "@/app/common/data/meta.data";
import { getPublicBasePath } from "@/app/helper/basePath";

export const metadata: Metadata = {
    title: ADMIN_PAGE.title,
    description: ADMIN_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
        },
    ],
};

const Admin = () => {
    return (
        <>
            <AdminPage />
        </>
    );
};

export default Admin;
