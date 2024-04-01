import { Metadata } from "next";
import EmergencyPage from "./components/EmergencyPage";
import { EMERGENCY_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: EMERGENCY_PAGE.title,
    description: EMERGENCY_PAGE.description,
};

const Emergency = () => {
    return (
        <>
            <EmergencyPage />
        </>
    );
};

export default Emergency;
