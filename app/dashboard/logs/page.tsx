import { Metadata } from "next";
import LogsPage from "./components/LogsPage";
import { LOG_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: LOG_PAGE.title,
    description: LOG_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
};

const Logs = () => {
    return (
        <>
            <LogsPage />
        </>
    );
};

export default Logs;
