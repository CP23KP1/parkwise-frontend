import { Metadata } from "next";
import DevicePage from "./components/DevicePage";
import { DEVICE_PAGE } from "@/app/common/data/meta.data";
import { getPublicBasePath } from "@/app/helper/basePath";

export const metadata: Metadata = {
    title: DEVICE_PAGE.title,
    description: DEVICE_PAGE.description,
    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "32x32",
            url: getPublicBasePath("/favicon.ico"),
        },
    ],
};

const Device = () => {
    return (
        <>
            <DevicePage />
        </>
    );
};

export default Device;
