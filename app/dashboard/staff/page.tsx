import { Metadata } from "next";
import StaffPage from "./components/StaffPage";
import { STAFF_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: STAFF_PAGE.title,
    description: STAFF_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
};

const Staff = () => {
    return (
        <>
            <StaffPage />
        </>
    );
};

export default Staff;
