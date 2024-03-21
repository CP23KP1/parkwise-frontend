"use client";

import { useEffect, useState } from "react";
import SummaryCard from "../components/summary-card";
import { countCar, countDevice, countStaff } from "../services/device.service";
import { countZone } from "../services/zone.service";

const Dashboard: React.FC = () => {
    const [zone, setZone] = useState(0);
    const [device, setDevice] = useState(0);
    const [car, setCar] = useState(0);
    const [staff, setStaff] = useState(0);
    useEffect(() => {
        countDevice(setDevice);
        countZone(setZone);
        countCar(setCar);
        countStaff(setStaff);
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2  pt-12 sm:ml-20 md:ml-32 xl:ml-32 gap-8 lg:gap-0">
                <SummaryCard
                    title="รถในระบบ 🚘"
                    unit="คัน"
                    value={car.toString()}
                />
                <SummaryCard
                    title="อุปกรณ์ที่ใช้งานอยู่"
                    unit="เครื่อง"
                    value={device.toString()}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 pt-2 md:pt-12 ml-0 md:ml-32 lg:ml-8 gap-8 lg:gap-0">
                <SummaryCard title="โซน" unit="จุด" value={zone.toString()} />
                <SummaryCard
                    title="พนักงานที่ใช้ระบบ"
                    unit="คน"
                    value={staff.toString()}
                />
            </div>
        </>
    );
};

export default Dashboard;
