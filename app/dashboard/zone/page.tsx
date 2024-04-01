import { Metadata } from "next";
import { ZONE_PAGE } from "@/app/common/data/meta.data";
import ZonePage from "./components/ZonePage";

export const metadata: Metadata = {
    title: ZONE_PAGE.title,
    description: ZONE_PAGE.description,
};

const Zone = () => {
    return (
        <>
            <ZonePage />
        </>
    );
};

export default Zone;
