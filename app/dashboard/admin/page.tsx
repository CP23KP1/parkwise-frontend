import { Metadata } from "next";
import AdminPage from "./components/AdminPage";
import { ADMIN_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: ADMIN_PAGE.title,
    description: ADMIN_PAGE.description,
};

const Admin = () => {
    return (
        <>
            <AdminPage />
        </>
    );
};

export default Admin;
