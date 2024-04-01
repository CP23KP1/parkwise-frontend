import { Metadata } from "next";
import DashboardPage from "./DashboardPage";
import { DASHBOARD_PAGE } from "../common/data/meta.data";

export const metadata: Metadata = {
    title: DASHBOARD_PAGE.title,
    description: DASHBOARD_PAGE.description,
};

const Dashboard = () => {
    return (
        <>
            <DashboardPage />
        </>
    );
};

export default Dashboard;
