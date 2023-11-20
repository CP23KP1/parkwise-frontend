"use client";
import React, { useState } from "react";
import { menuType } from "../assets/data/menu";
import SidebarItem from "./sidebar-item";
import { logout } from "../helper/auth";
import { BASE_PATH } from "@/app/utils/constants";
import { getPublicBasePath } from "../helper/basePath";

interface SidebarProps {
    open?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open = false }) => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const width = openSidebar ? "w-42 md:w-56" : "w-16";
    const widthMobile = openSidebar ? "w-16 md:w-56" : "w-16";

    const handleClickOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const renderLogout = () => {
        return (
            <div className="pt-4">
                {openSidebar ? (
                    <>
                        <div
                            className="cursor-pointer block text-center bg-red-500 text-white mx-6 p-3 rounded-md hover:bg-red-700"
                            onClick={logout}
                        >
                            <button>Logout</button>
                        </div>
                    </>
                ) : (
                    <div className="w-12 h-12 pl-4 hover:cursor-pointer">
                        <img
                            src={getPublicBasePath('/menu/logout.png')}
                            alt="Logout"
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div
                className={`fixed h-screen transition-all duration-300 ${width} bg-zinc-100 rounded-r-3xl`}
                style={{ top: 0, left: 0 }}
            >
                <div className="p-4 flex items-center justify-between">
                    <div className={`${openSidebar ? "w-14" : "pt-3"}`}>
                        <div
                            className="w-8 hover:bg-slate-300 hover:rounded hover:cursor-pointer"
                            onClick={handleClickOpenSidebar}
                        >
                            <img
                                src={getPublicBasePath('/menu/hamburger_menu.png')}
                                alt="Hamburger Menu"
                            />
                        </div>
                    </div>
                    {openSidebar && (
                        <>
                            <div className="w-10">
                                <img
                                    src={getPublicBasePath('/logo/kmutt_logo.jpg')}
                                    alt="KMUTT Logo"
                                />
                            </div>
                            <div>
                                <h1>ParkWise</h1>
                            </div>
                        </>
                    )}
                </div>
                <div
                    className="w-full"
                    style={{
                        overflowY: "auto",
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    {menuType.map((item) => {
                        return (
                            <SidebarItem
                                key={item.name}
                                icon={item.icon}
                                name={item.name}
                                link={item.link}
                                open={openSidebar}
                            />
                        );
                    })}
                    {renderLogout()}
                </div>
            </div>
            <div
                className={`h-screen transition-all duration-300 ${widthMobile} bg-zinc-100 rounded-r-3xl`}
            ></div>
        </>
    );
};

export default Sidebar;
