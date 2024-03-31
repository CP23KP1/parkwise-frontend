"use client";

import { useEffect, useState } from "react";
import SummaryCard from "../components/summary-card";
import { countCar, countDevice, countStaff } from "../services/device.service";
import { countZone } from "../services/zone.service";
import {
    getReportByDays,
    getReportByTopTenByTimeRange,
} from "../services/report.service";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ReportCard from "../components/report-card";
import { Metadata } from "next";
import { DASHBOARD_PAGE } from "../common/data/meta.data";
import Head from "next/head";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: React.FC = () => {
    const [zone, setZone] = useState(0);
    const [device, setDevice] = useState(0);
    const [car, setCar] = useState(0);
    const [staff, setStaff] = useState(0);

    // Report
    const [topTenByTimeRangeSeries, setTopTenByTimeRangeSeries] = useState<
        number[]
    >([]);
    const [topTenByTimeRangeOptions, setTopTenByTimeRangeOptions] = useState({
        chart: {
            width: 380,
            type: "pie",
        },
        labels: [],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    } as ApexOptions);

    const [byDaysSeries, setByDaysSeries] = useState([
        {
            name: "วันที่มีการใช้งาน",
            data: [0, 0, 0, 0, 0, 0, 0],
        },
    ]);

    const [byDaysOptions, setByDaysOptions] = useState({
        chart: {
            type: "bar",
            height: 350,
        },
        labels: [
            "อาทิตย์",
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัสบดี",
            "ศุกร์",
            "เสาร์",
        ],
    } as ApexOptions);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        await countDevice(setDevice);
        await countZone(setZone);
        await countCar(setCar);
        await countStaff(setStaff);
        const topTenByTimeRangeResponse = await getReportByTopTenByTimeRange(
            dayjs().startOf("month").format("YYYY-MM-DD"),
            dayjs().endOf("month").format("YYYY-MM-DD")
        );
        const byDaysResponse = await getReportByDays();
        if (topTenByTimeRangeResponse) {
            setTopTenByTimeRangeSeries([
                topTenByTimeRangeResponse?.morning,
                topTenByTimeRangeResponse?.afternoon,
                topTenByTimeRangeResponse?.evening,
            ]);
            setTopTenByTimeRangeOptions({
                ...topTenByTimeRangeOptions,
                labels: ["เช้า", "บ่าย", "เย็น"],
            });
        }
        if (byDaysResponse) {
            const mapValues = {
                Sunday: 0,
                Monday: 1,
                Tuesday: 2,
                Wednesday: 3,
                Thursday: 4,
                Friday: 5,
                Saturday: 6,
            };

            const dayMap = new Map(Object.entries(mapValues));

            //* Respone should be
            const tempByDaysSeries = Array(7).fill(0);

            for (const response of byDaysResponse) {
                const day = dayMap.get(response.day) as number;
                tempByDaysSeries[day] = response.count;
            }
            setByDaysSeries([
                {
                    name: "วันที่มีการใช้งาน",
                    data: tempByDaysSeries,
                },
            ]);
        }
    };

    const getReportByTopTenByTimeRangeTitle = () => {
        return `ช่วงเวลาที่มีการจอด ประจำเดือนนี้`;
    };

    const getReportByDaysTitle = () => {
        return `วันที่มีการใช้งาน ประจำเดือนนี้`;
    };

    return (
        <>
            <Head>
                <title>{DASHBOARD_PAGE.title}</title>
                <meta name="description" content={DASHBOARD_PAGE.description} />
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-4 pt-12 gap-8 lg:gap-2">
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
                <SummaryCard title="โซน" unit="จุด" value={zone.toString()} />
                <SummaryCard
                    title="พนักงานที่ใช้ระบบ"
                    unit="คน"
                    value={staff.toString()}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 pt-12 gap-8 lg:gap-2">
                <div className="col-span-1">
                    <ReportCard title={getReportByTopTenByTimeRangeTitle()}>
                        <ApexChart
                            options={topTenByTimeRangeOptions}
                            series={topTenByTimeRangeSeries}
                            type="pie"
                            width={"100%"}
                            height={400}
                        />
                    </ReportCard>
                </div>
                <div className="col-span-2">
                    <ReportCard title={getReportByDaysTitle()}>
                        <ApexChart
                            options={byDaysOptions}
                            series={byDaysSeries}
                            type="bar"
                            width={"100%"}
                            height={400}
                        />
                    </ReportCard>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
