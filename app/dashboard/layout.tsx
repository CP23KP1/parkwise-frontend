import React from "react";
import Sidebar from "../components/sidebar";
import { Kanit } from "next/font/google";

const kanit = Kanit({
    weight: "200",
    preload: false,
});

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <html>
            <head></head>
            <body className={kanit.className}>
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
