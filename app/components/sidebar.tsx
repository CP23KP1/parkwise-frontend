"use client";
import React, { useState } from "react";
import { menuType } from "../assets/data/menu";
import SidebarItem from "./sidebar-item";

interface SidebarProps {
  open?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open = false }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const width = openSidebar ? "w-56" : "w-16";

  const handleClickOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const renderLogout = () => {
    return (
      <div className="pt-4">
        {openSidebar ? (
          <>
            <div className="block text-center bg-red-500 text-white mx-6">
              <button>Logout</button>
            </div>
          </>
        ) : (
            <div className="w-12 h-12 pl-4 hover:cursor-pointer">
              <img src="/menu/logout.png" />
            </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`h-screen transition-all duration-300 ${width} bg-zinc-100 rounded-r-3xl`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={`${openSidebar ? "w-14" : "pt-3"}`}>
            <div
              className="w-8 hover:bg-slate-500 hover:rounded hover:cursor-pointer"
              onClick={handleClickOpenSidebar}
            >
              <img src="/menu/hamburger_menu.png" alt="Hamburger Menu" />
            </div>
          </div>
          {openSidebar && (
            <>
              <div className="w-14">
                <img src="/logo/kmutt_logo.jpg" alt="KMUTT Logo" />
              </div>
              <div>
                <h1>ParkWise</h1>
              </div>
            </>
          )}
        </div>
        <div className="w-ful">
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
    </>
  );
};

export default Sidebar;
