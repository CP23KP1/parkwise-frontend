"use client";

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
  return (
    <Link href={link}>
    <div className="grid grid-cols-3 w-full align-middle justify-center pt-3 hover:bg-slate-400 hover:cursor-pointer">
      <div className="w-12 h-12 pl-4">
        <img src={icon} />
      </div>
      <div className="mt-1">{open && <h1>{name}</h1>}</div>
    </div>
    </Link>
  );
};

export default SidebarItem;
