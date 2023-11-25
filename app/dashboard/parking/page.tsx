// @ts-nocheck
"use client";
import DeleteModal from "@/app/components/modal/delete-modal";
import ResponsiveParkingTable from "@/app/components/parking/parking-table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import FilterButton, {
  FilterButtonProps,
} from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { getPublicBasePath } from "@/app/helper/basePath";
import { createParking, fetchParking } from "./function";
import { fetchZone } from "../device/function";

const Parking = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [parking, setParking] = useState<ParkingRowData[]>([]);
  const [page, setPage] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [zone, setZone] = useState<ZoneRowData[]>([]);
  const [zoneId, setZoneId] = useState<ZoneRowData[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchZone(setZone, setZoneId);
    fetchParking(
      setParking,
      setPage,
      setPageAll,
      page,
      search,
      "createdAt",
      "desc"
    );
  }, []);

  const handleZoneChange = (e) => {
    setZoneId(e.target.value);
  };

  const handleNextPage = async () => {
    await fetchParking(setParking, setPage, setPageAll, page + 1);
    setPage(page + 1);
  };

  const handlePrevPage = async () => {
    await fetchParking(setParking, setPage, setPageAll, page - 1);
    setPage(page + 1);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    await fetchParking(setParking, setPage, setPageAll, page, e.target.value);
  };

  const filterData: FilterButtonProps = [
    {
      title: "ใหม่ - เก่า",
      func: async () =>
        await fetchParking(
          setParking,
          setPage,
          setPageAll,
          page,
          search,
          "createdAt",
          "desc"
        ),
    },
    {
      title: "เก่า - ใหม่",
      func: async () =>
        await fetchParking(
          setParking,
          setPage,
          setPageAll,
          page,
          search,
          "createdAt",
          "asc"
        ),
    },
    {
      title: "จำนวนมาก - น้อย",
      func: async () =>
        await fetchParking(
          setParking,
          setPage,
          setPageAll,
          page,
          search,
          "amount",
          "desc"
        ),
    },
    {
      title: "จำนวนน้อย - มาก",
      func: async () =>
        await fetchParking(
          setParking,
          setPage,
          setPageAll,
          page,
          search,
          "amount",
          "asc"
        ),
    },
  ];
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">สร้างที่จอดรถ</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <p>คำอธิบาย</p>
              <TextInput onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div>
              <p>จำนวน</p>
              <TextInput
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <p>โซน</p>
              <select
                className="border-2 border-solid border-gray-600 w-80 h-10"
                onChange={handleZoneChange}
              >
                {zone.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>{" "}
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() => createParking(name, desc, amount, zoneId)}
              >
                เพิ่ม
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <div>
          <h1 className="text-xl font-bold">ที่จอดรถ</h1>
        </div>
        <div className="flex justify-between my-4 align-middle">
          <div className="w-10/12 flex align-middle">
            <input
              type="text"
              className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
              placeholder="ค้นหา"
              onChange={handleSearch}
            />
            <div className="mt-2 ml-2">
              <FilterButton data={filterData as never} />
            </div>
          </div>
          <button
            className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
            onClick={onOpenModal}
          >
            เพิ่ม
          </button>
        </div>
        <ResponsiveParkingTable data={parking} />
        <div className="mt-8 flex align-middle gap-4">
          <button
            className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <img
              src={getPublicBasePath("/svg/back-button.svg")}
              className="w-5 h-5"
            />
          </button>
          <div>
            <p className="text-center mt-2">
              {page} / {pageAll || 1}
            </p>
          </div>
          <button
            className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={page === pageAll}
          >
            <img
              src={getPublicBasePath("/svg/next-button.svg")}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Parking;
