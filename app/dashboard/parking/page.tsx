import { Metadata } from "next";
import ParkingPage from "./components/ParkingPage";
import { PARKING_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: PARKING_PAGE.title,
    description: PARKING_PAGE.description,
};

const Parking = () => {
    return (
        <>
            <ParkingPage />
        </>
    );
};

export default Parking;
