import { Metadata } from "next";
import EmergencyPage from "./components/EmergencyPage";
import { EMERGENCY_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: EMERGENCY_PAGE.title,
    description: EMERGENCY_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
};

const Emergency = () => {
    return (
        <>
            <EmergencyPage />
        </>
    );
};

export default Emergency;
