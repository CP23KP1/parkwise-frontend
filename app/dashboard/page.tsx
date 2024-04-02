import { Metadata } from "next";
import DashboardPage from "./DashboardPage";
import { DASHBOARD_PAGE } from "../common/data/meta.data";
import { getPublicBasePath } from "../helper/basePath";

export const metadata: Metadata = {
    title: DASHBOARD_PAGE.title,
    description: DASHBOARD_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
        },
    ],
};

const Dashboard = () => {
    return (
        <>
            <DashboardPage />
        </>
    );
};

export default Dashboard;
