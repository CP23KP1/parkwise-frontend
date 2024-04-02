import { Metadata } from "next";
import { ZONE_PAGE } from "@/app/common/data/meta.data";
import ZonePage from "./components/ZonePage";
import { getPublicBasePath } from "@/app/helper/basePath";

export const metadata: Metadata = {
    title: ZONE_PAGE.title,
    description: ZONE_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
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
