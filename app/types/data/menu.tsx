import { FaCar, FaHouse, FaSquareParking } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { SiAmazonecs } from "react-icons/si";
import { BsDatabase } from "react-icons/bs";
import { getPublicBasePath } from "@/app/helper/basePath";

export const menuType = [
    {
        name: "หน้าหลัก",
        icon: <FaHouse />,
        link: getPublicBasePath("/dashboard"),
    },
    {
        name: "ที่จอดรถ",
        icon: <FaSquareParking />,
        link: getPublicBasePath("/dashboard/parking"),
    },
    {
        name: "เจ้าหน้าที่",
        icon: <RiAdminFill />,
        link: getPublicBasePath("/dashboard/staff"),
    },
    {
        name: "อุปกรณ์",
        icon: <BiCctv />,
        link: getPublicBasePath("/dashboard/device"),
    },
    // {
    //   name: "คาร์บอน",
    //   icon: "/menu/low-carbon.png",
    //   link: "/dashboard/carbon",
    // },
    {
        name: "โซน",
        icon: <SiAmazonecs />,
        link: getPublicBasePath("/dashboard/zone"),
    },
    {
        name: "Logs",
        icon: <BsDatabase />,
        link: getPublicBasePath("/dashboard/logs"),
    },
    {
        name: "รถยนต์",
        icon: <FaCar />,
        link: getPublicBasePath("/dashboard/car"),
    },
    {
        name: "ผู้ดูแล",
        icon: <RiAdminFill />,
        link: getPublicBasePath("/dashboard/admin"),
    },
];
