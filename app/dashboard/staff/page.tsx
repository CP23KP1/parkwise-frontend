import { Metadata } from "next";
import StaffPage from "./components/StaffPage";
import { STAFF_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: STAFF_PAGE.title,
    description: STAFF_PAGE.description,
};

const Staff = () => {
    return (
        <>
            <StaffPage />
        </>
    );
};

export default Staff;
