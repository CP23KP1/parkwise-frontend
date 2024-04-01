import { Metadata } from "next";
import DevicePage from "./components/DevicePage";
import { DEVICE_PAGE } from "@/app/common/data/meta.data";

export const metadata: Metadata = {
    title: DEVICE_PAGE.title,
    description: DEVICE_PAGE.description,
};

const Device = () => {
    return (
        <>
            <DevicePage />
        </>
    );
};

export default Device;
