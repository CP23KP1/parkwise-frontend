import { Metadata } from "next";
import { CAR_PAGE, ZONE_PAGE } from "@/app/common/data/meta.data";
import CarPage from "./components/CarPage";
import { getPublicBasePath } from "@/app/helper/basePath";

export const metadata: Metadata = {
    title: CAR_PAGE.title,
    description: CAR_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
        },
    ],
};

const Car = () => {
    return (
        <>
            <CarPage />
        </>
    );
};

export default Car;
