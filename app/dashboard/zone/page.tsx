import { Metadata } from "next";
import { ZONE_PAGE } from "@/app/common/data/meta.data";
import ZonePage from "./components/ZonePage";

export const metadata: Metadata = {
    title: ZONE_PAGE.title,
    description: ZONE_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
};

const Zone = () => {
    return (
        <>
            <ZonePage />
        </>
    );
};

export default Zone;
