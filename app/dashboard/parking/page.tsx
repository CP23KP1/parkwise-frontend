import { Metadata } from "next";
import ParkingPage from "./components/ParkingPage";
import { PARKING_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: PARKING_PAGE.title,
    description: PARKING_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
};

const Parking = () => {
    return (
        <>
            <ParkingPage />
        </>
    );
};

export default Parking;
