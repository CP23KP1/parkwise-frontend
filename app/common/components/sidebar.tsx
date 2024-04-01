"use client";
import React, { useEffect, useState } from "react";
import { logout } from "../../helper/auth";
import { getPublicBasePath } from "../../helper/basePath";
import { Button, Listbox, ListboxItem, cn } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { menuType } from "../../types/data/menu";
import { log } from "console";
import { getProfile } from "../../services/auth.service";
import { Profile } from "../../types/data/profile";

interface SidebarProps {
    open?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open = false }) => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const width = openSidebar ? "w-42 md:w-56" : "w-16";
    const widthMobile = openSidebar ? "w-16 md:w-56" : "w-16";
    const router = useRouter();
    const pathname = usePathname();
    const [profile, setProfile] = useState<Profile | null>(null);

    const handleClickOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    useEffect(() => {
        fetchProflie();
    }, []);

    const fetchProflie = async () => {
        const profile = await getProfile();
        setProfile(profile);
    };

    const renderLogout = () => {
        return (
            <div className="pt-4">
                {openSidebar ? (
                    <>
                        <div className="flex justify-center">
                            <Button
                                size="md"
                                color="danger"
                                className="text-white"
                                onClick={logout}
                            >
                                ออกจากระบบ
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="w-12 h-12 pl-4 hover:cursor-pointer">
                        <img
                            src={getPublicBasePath("/menu/logout.png")}
                            alt="Logout"
                            onClick={logout}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div
                className={`fixed h-screen transition-all duration-300 ${width} bg-white`}
                style={{ top: 0, left: 0 }}
            >
                <div className="p-4 flex items-center justify-between">
                    <div className={`${openSidebar ? "w-14" : "pt-3"}`}>
                        <div
                            className="w-8 hover:bg-slate-300 hover:rounded hover:cursor-pointer"
                            onClick={handleClickOpenSidebar}
                        >
                            <img
                                src={getPublicBasePath(
                                    "/menu/hamburger_menu.png"
                                )}
                                alt="Hamburger Menu"
                            />
                        </div>
                    </div>
                    {openSidebar && (
                        <>
                            <div className="w-36">
                                <img
                                    src={getPublicBasePath("/logo/logo-bg.png")}
                                    alt="Parkwise Logo"
                                />
                            </div>
                            {/* <div className="pr-12">
                                <h1 className="font-bold">ParkWise</h1>
                            </div> */}
                        </>
                    )}
                </div>
                {openSidebar && (
                    <>
                        <div className="border-b-2 border-gray-200 mb-6"></div>
                        <div className="flex flex-col justify-center">
                            <div>
                                <h2 className="font-bold text-center text-[20px]">
                                    {profile?.firstname} {profile?.lastname}
                                </h2>
                            </div>
                            <div>
                                <h3 className="italic text-center text-[14px] text-gray-500">
                                    ตำแหน่ง:{" "}
                                    <span className="font-bold text-black">
                                        {profile?.type === "admin"
                                            ? "Admin"
                                            : "User"}
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-200 my-6"></div>
                    </>
                )}

                <div
                    className="w-full"
                    style={{
                        overflowY: "auto",
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    <Listbox
                        variant="solid"
                        aria-label="Listbox menu with icons"
                        itemClasses={{
                            base: `px-3 gap-3 h-12 data-[hover=true]:bg-primary data-[hover=true]:opacity-80 rounded-lg`,
                        }}
                        color="primary"
                    >
                        {menuType.map((item) => {
                            const isActive = () => {
                                return pathname === item.link;
                            };
                            return (
                                <ListboxItem
                                    className={cn({
                                        "bg-primary rounded-lg text-white":
                                            isActive(),
                                    })}
                                    key={item.name}
                                    startContent={item.icon}
                                    onClick={() => {
                                        router.push(item.link);
                                    }}
                                >
                                    {openSidebar && item.name}
                                </ListboxItem>
                            );
                        })}
                    </Listbox>
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
