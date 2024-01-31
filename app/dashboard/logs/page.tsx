"use client";
import { LogsRowData } from "@/app/types/data/logs";
import ResponsiveLogsTable from "@/app/components/logs/logs-table";
import { getPublicBasePath } from "@/app/helper/basePath";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchZone } from "./function";
import axios from "axios";
import useSWR from "swr";
import { ZoneRowData } from "@/app/types/data/zone";
import {
    Autocomplete,
    AutocompleteItem,
    Input,
    Pagination,
    Select,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

interface DataLog {
    data: LogsRowData[];
    meta: any;
}
const Logs = () => {
    const [data, setData] = useState<LogsRowData[]>([]);
    const [latestData, setLatestData] = useState<LogsRowData>(null as any);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [zones, setZone] = useState<ZoneRowData[]>([] as any);
    const [selectedZone, setSelectedZone] = useState("1");
    const [allPage, setAllPage] = useState(0);

    const fetcher = (url: string) =>
        axios
            .get(url)
            .then((res) => res.data)
            .then((res) => {
                setAllPage(res.meta.totalPages);
                setPage(res.meta.page);
                return res;
            });

    const fetcherLatest = (url: string) =>
        axios
            .get(url)
            .then((res) => res.data)
            .then((res) => {
                return res;
            });

    const { data: latestSwrData, error: latestSwrError } = useSWR(
        process.env.NEXT_PUBLIC_API_HOST +
            `/license-plate?page=1&limit=1${search ? `&search=${search}` : ""}${
                selectedZone ? `&zoneId=${selectedZone}` : ""
            }`,
        fetcherLatest,
        { refreshInterval: 1000 }
    );

    useEffect(() => {
        if (
            latestSwrData &&
            latestSwrData.data &&
            latestSwrData.data.length > 0
        ) {
            setLatestData(latestSwrData.data[0]);
        } else {
            setLatestData(null as any);
        }
    }, [latestSwrData]);

    const { data: swrData, error } = useSWR(
        process.env.NEXT_PUBLIC_API_HOST +
            `/license-plate?page=${page}&limit=${limit}${
                search ? `&search=${search}` : ""
            }${selectedZone ? `&zoneId=${selectedZone}` : ""}`,
        fetcher,
        { refreshInterval: 1000 }
    );

    useEffect(() => {
        fetchZone(setZone, setSelectedZone);
    }, []);

    useEffect(() => {
        if (swrData) {
            setData(swrData.data);
        }
    }, [swrData]);

    const zoneData = useMemo(() => {
        return [...zones].map((item) => {
            return {
                value: item.id.toString() || "1",
                label: item.name,
            };
        });
    }, [zones]);

    const getZoneAutoCompleteLabel = useCallback(
        (zoneId: string) => {
            const zone = zones.find((item) => item.id === parseInt(zoneId));
            return zone ? zone.name : "";
        },
        [zones]
    );

    return (
        <div className="w-full pl-10 md:pl-0">
            <div>
                <h1 className="text-xl font-bold">Logs</h1>
                <div className="my-6">
                    <Autocomplete
                        size="sm"
                        items={zoneData}
                        placeholder="เลือกโซน"
                        className="max-w-xs"
                        selectedKey={selectedZone}
                        onSelectionChange={setSelectedZone}
                        inputValue={getZoneAutoCompleteLabel(selectedZone)}
                        isClearable={false}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.value}>
                                {item.label}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>

                {/* <select
          className="form-select block border-solid border-2 rounded-md w-32 h-10 border-gray-600 my-4"
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          {zone &&
            zone.map((item) => <option value={item.id}>{item.name}</option>)}
        </select> */}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <div>
                    <div className="w-full text-center md:w-96 flex justify-center">
                        <img
                            className="text-center rounded-md"
                            src={latestData && latestData.licenseUrl}
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/5">
                    <h1 className="text-base md:text-xl font-bold">
                        ใช้งานล่าสุด
                    </h1>
                    <div className="mt-8 grid grid-cols-2 gap-y-4">
                        <h1 className="text-base md:text-xl">
                            รถยนต์ทะเบียน:{" "}
                        </h1>
                        <h1 className="text-base md:text-xl">
                            {latestData && latestData.car.licensePlate}
                        </h1>
                        <h1 className="text-base md:text-xl">
                            ชื่อผู้ใช้บริการ:{" "}
                        </h1>
                        <h1 className="text-base md:text-xl">
                            {latestData && latestData.staff.firstname}
                            {latestData && " " + latestData.staff.lastname}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between my-4 align-middle">
                    <div className="w-10/12 flex align-middle">
                        <Input
                            className="w-8/12 md:w-4/12 h-10"
                            variant="bordered"
                            type="text"
                            placeholder="ค้นหา"
                            labelPlacement="outside"
                            startContent={
                                <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <ResponsiveLogsTable data={data as any[]} />
                <div className="mt-8 flex justify-end align-middle gap-4">
                    <Pagination
                        isCompact
                        showControls
                        total={allPage}
                        initialPage={page}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Logs;
