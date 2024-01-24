import React from "react";
import Sidebar from "../components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <html>
            <head></head>
            <body>
                <div className="flex">
                    <Sidebar />

                    <main className="flex-grow p-8 bg-gray-50">{children}</main>
                </div>
                <footer></footer>
            </body>
        </html>
    );
};

export default DashboardLayout;
