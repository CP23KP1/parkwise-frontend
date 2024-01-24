"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface SidebarItemRenderProps {
    name: string;
    icon: string;
    link: string;
    open: boolean;
}

const SidebarItem: React.FC<SidebarItemRenderProps> = ({
    name,
    icon,
    link,
    open,
}) => {
    const router = usePathname();
    const path = () => router === link;
    return (
        //* bg white and opacity 20% when path is true
        <Link href={link}>
            <div
                className={`transform hover:translate-x-1 grid grid-cols-3 w-auto align-middle justify-center my-2 mx-2 rounded-lg pt-3 hover:bg-[#e9e9ff] ${
                    path() && "bg-[#5957ff]"
                } hover:cursor-pointer`}
            >
                <div className={`${open ? "pl-4 w-12 h-12" : "pl-2 w-8 h-8"}`}>
                    <img src={icon} />
                </div>
                <div className="mt-1">
                    {open && (
                        <h1 className={path() ? "text-white" : "text-black"}>
                            {name}
                        </h1>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default SidebarItem;
