"use client";

import { useEffect, useState } from "react";
import SummaryCard from "../common/components/summary-card";
import { countCar, countDevice, countStaff } from "../services/device.service";
import { countZone } from "../services/zone.service";
import {
    getReportByDays,
    getReportTopTenByZone,
} from "../services/report.service";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ReportCard from "../common/components/report-card";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { TopTenByZoneReport } from "../types/data/report.response";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const columns = [
    {
        name: "โซน",
        uid: "zoneName",
        sortable: true,
    },
    {
        name: "เช้า",
        uid: "morning",
        sortable: true,
    },
    {
        name: "บ่าย",
        uid: "afternoon",
        sortable: true,
    },
    {
        name: "เย็น",
        uid: "evening",
        sortable: true,
    },
    {
        name: "รวม",
        uid: "total",
        sortable: true,
    },
];

const DashboardPage: React.FC = () => {
    const [zone, setZone] = useState(0);
    const [device, setDevice] = useState(0);
    const [car, setCar] = useState(0);
    const [staff, setStaff] = useState(0);

    // Report
    const [topTenByTimeRangeSeries, setTopTenByTimeRangeSeries] = useState<
        number[]
    >([]);

    const [topTenByZone, setTopTenByZone] = useState<TopTenByZoneReport[]>([]);

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
        const topTenByZoneReport = await getReportTopTenByZone(
            dayjs().startOf("year").format("YYYY-MM-DD"),
            dayjs().endOf("year").format("YYYY-MM-DD")
        );
        const byDaysResponse = await getReportByDays();

        if (topTenByZoneReport?.length) {
            setTopTenByZone(topTenByZoneReport);
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

    const getTopTenByZoneReportTitle = () => {
        return `โซนที่มีการใช้งานมากที่สุด ประจำเดือนนี้`;
    };

    const getByDaysReportTitle = () => {
        return `วันที่มีการใช้งาน ประจำเดือนนี้`;
    };

    const renderCell = (
        item: TopTenByZoneReport,
        columnKey: keyof TopTenByZoneReport
    ) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            default:
                return cellValue;
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 pt-12 gap-8 lg:gap-2 w-full">
                <SummaryCard
                    title="รถในระบบ 🚘"
                    unit="คัน"
                    value={car.toString()}
                />
                <SummaryCard
                    title="อุปกรณ์ในระบบทั้งหมด"
                    unit="เครื่อง"
                    value={device.toString()}
                />
                <SummaryCard title="โซน" unit="จุด" value={zone.toString()} />
                <SummaryCard
                    title="ลูกค้า/เจ้าหน้าที่ ในระบบ"
                    unit="คน"
                    value={staff.toString()}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 pt-12 gap-8 lg:gap-2">
                <div className="col-span-1">
                    <ReportCard title={getTopTenByZoneReportTitle()}>
                        <Table
                            aria-label="Example table with custom cells, pagination and sorting"
                            isHeaderSticky
                            classNames={{
                                wrapper: "max-h-full",
                            }}
                            // sortDescriptor={sortDescriptor}
                            topContentPlacement="outside"
                            // onSortChange={setSortDescriptor}
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.uid}
                                        align={
                                            column.uid === "actions"
                                                ? "center"
                                                : "start"
                                        }
                                        allowsSorting={column.sortable}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody
                                emptyContent={"ไม่มีข้อมูลโซน"}
                                items={topTenByZone}
                            >
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => (
                                            <TableCell>
                                                {renderCell(
                                                    item,
                                                    columnKey as keyof TopTenByZoneReport
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ReportCard>
                </div>
                <div className="col-span-2">
                    <ReportCard title={getByDaysReportTitle()}>
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

export default DashboardPage;
