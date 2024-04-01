import { Metadata } from "next";
import { CAR_PAGE, ZONE_PAGE } from "@/app/common/data/meta.data";
import CarPage from "./components/CarPage";

export const metadata: Metadata = {
    title: CAR_PAGE.title,
    description: CAR_PAGE.description,
};

const Car = () => {
    return (
        <>
            <CarPage />
        </>
    );
};

export default Car;
