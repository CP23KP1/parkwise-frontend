"use client";
import { DeviceRowData } from "@/app/assets/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useEffect, useState } from "react";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { createDevice, fetchDevice, fetchZone } from "./function";
import { ZoneRowData } from "@/app/assets/data/zone";
import { getPublicBasePath } from "@/app/helper/basePath";

const Device = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [zone, setZone] = useState<ZoneRowData[]>([]);
  const [zoneId, setZoneId] = useState(0);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [deviceShow, setDeviceShow] = useState<DeviceRowData[]>([]);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    fetchZone(setZone, setZoneId);
    fetchDevice(setDeviceShow, setPage, setAllPage, 1, search, field, order);
  }, []);

  const handlePrevPage = async () => {
    await fetchDevice(setDeviceShow, setPage, setAllPage, page - 1);
    setPage(page - 1);
  };

  const handleNextPage = async () => {
    await fetchDevice(setDeviceShow, setPage, setAllPage, page + 1);
    setPage(page + 1);
  };

  const filterData: FilterMenuProps[] = [
    {
      title: "ใหม่ - เก่า",
      func: async () => {
        await fetchDevice(
          setDeviceShow,
          setPage,
          setAllPage,
          page,
          search,
          "createdAt",
          "desc"
        );
        setField("createdAt");
        setOrder("desc");
      },
    },
    {
      title: "เก่า - ใหม่",
      func: async () => {
        await fetchDevice(
          setDeviceShow,
          setPage,
          setAllPage,
          page,
          search,
          "createdAt",
          "asc"
        );
        setField("createdAt");
        setOrder("asc");
      },
    },
    {
      title: "ราคาถูก - แพง",
      func: async () => {
        await fetchDevice(
          setDeviceShow,
          setPage,
          setAllPage,
          page,
          search,
          "price",
          "asc"
        );
        setField("price");
        setOrder("asc");
      },
    },
    {
      title: "ราคาแพง - ถูก",
      func: async () => {
        await fetchDevice(
          setDeviceShow,
          setPage,
          setAllPage,
          page,
          search,
          "price",
          "desc"
        );
        setField("price");
        setOrder("desc");
      },
    },
  ];

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
    await fetchDevice(
      setDeviceShow,
      setPage,
      setAllPage,
      page,
      e.target.value,
      field,
      order
    );
  };

  const handleZoneChange = (event: any) => {
    const selectedZoneId = parseInt(event.target.value, 10);
    setZoneId(selectedZoneId);
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">สร้างอุปกรณ์</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p>คำอธิบาย</p>
              <TextInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <p>แบรนด์</p>
              <TextInput
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <p>ราคา</p>
              <TextInput
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  createDevice(
                    name,
                    description,
                    price,
                    brand,
                    zoneId.toString()
                  )
                }
              >
                เพิ่ม
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>

      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">อุปกรณ์</h1>
      </div>
      <div className="flex justify-between my-4 align-middle">
        <div className="w-10/12 flex align-middle">
          <input
            type="text"
            className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
            placeholder="ค้นหา"
            onChange={(e) => handleSearch(e)}
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
      <ResponsiveDeviceTable data={deviceShow} />
      <div className="mt-8 flex align-middle gap-4">
        <button
          className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
          disabled={page === 1}
          onClick={handlePrevPage}
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
          onClick={handleNextPage}
          disabled={page == allPage}
        >
          <img
            src={getPublicBasePath("/svg/next-button.svg")}
            className="w-5 h-5"
          />
        </button>
      </div>
    </>
  );
};

export default Device;
