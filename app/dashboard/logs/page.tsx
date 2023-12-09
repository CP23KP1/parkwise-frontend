// @ts-nocheck
"use client";
import { LogsRowData } from "@/app/assets/data/logs";
import ResponsiveLogsTable from "@/app/components/logs/logs-table";
import { getPublicBasePath } from "@/app/helper/basePath";
import { useEffect, useState } from "react";
import { fetchZone } from "./function";
import axios from "axios";
import useSWR from "swr";
import { ZoneRowData } from "@/app/assets/data/zone";

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
  const [zone, setZone] = useState<ZoneRowData>([] as any);
  const [selectedZone, setSelectedZone] = useState("");
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
    if (latestSwrData && latestSwrData.data && latestSwrData.data.length > 0) {
      setLatestData(latestSwrData.data[0]);
    }else{
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
  return (
    <div className="w-full pl-10 md:pl-0">
      <div>
        <h1 className="text-xl font-bold">Logs</h1>
        <select
          className="form-select block border-solid border-2 rounded-md w-32 h-10 border-gray-600 my-4"
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          {zone &&
            zone.map((item) => <option value={item.id}>{item.name}</option>)}
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div>
          <div className="w-full text-center md:w-96 flex justify-center">
            <img className="text-center" src={latestData && latestData.licenseUrl} />
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <h1 className="text-base md:text-xl font-bold">ใช้งานล่าสุด</h1>
          <div className="mt-8 grid grid-cols-2 gap-y-4">
            <h1 className="text-base md:text-xl">รถยนต์ทะเบียน: </h1>
            <h1 className="text-base md:text-xl">
              {latestData && latestData.car.licensePlate}
            </h1>
            <h1 className="text-base md:text-xl">ชื่อผู้ใช้บริการ: </h1>
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
            <input
              type="text"
              className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
              placeholder="ค้นหา"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <ResponsiveLogsTable data={data as any[]} />
        <div className="mt-8 flex align-middle gap-4">
          <button
            className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <img
              src={getPublicBasePath("/svg/back-button.svg")}
              className="w-5 h-5"
            />
          </button>
          <div>
            <p className="text-center mt-2">
              {page} / {allPage}
            </p>
          </div>
          <button
            className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setPage(page + 1)}
            disabled={page === allPage}
          >
            <img
              src={getPublicBasePath("/svg/next-button.svg")}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logs;
