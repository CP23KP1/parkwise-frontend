import { FaCar, FaHouse, FaSquareParking } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { SiAmazonecs } from "react-icons/si";
import { BsDatabase } from "react-icons/bs";

export const menuType = [
    {
        name: "หน้าหลัก",
        icon: <FaHouse />,
        link: "/dashboard",
    },
    {
        name: "ที่จอดรถ",
        icon: <FaSquareParking />,
        link: "/dashboard/parking",
    },
    {
        name: "เจ้าหน้าที่",
        icon: <RiAdminFill />,
        link: "/dashboard/staff",
    },
    {
        name: "อุปกรณ์",
        icon: <BiCctv />,
        link: "/dashboard/device",
    },
    // {
    //   name: "คาร์บอน",
    //   icon: "/menu/low-carbon.png",
    //   link: "/dashboard/carbon",
    // },
    {
        name: "โซน",
        icon: <SiAmazonecs />,
        link: "/dashboard/zone",
    },
    {
        name: "Logs",
        icon: <BsDatabase />,
        link: "/dashboard/logs",
    },
    {
        name: "รถยนต์",
        icon: <FaCar />,
        link: "/dashboard/car",
    },
    {
        name: "ผู้ดูแล",
        icon: <RiAdminFill />,
        link: "/dashboard/admin",
    },
];
