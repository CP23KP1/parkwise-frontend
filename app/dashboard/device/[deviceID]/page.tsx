"use client";
import { DeviceRowData } from "@/app/assets/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useEffect, useState } from "react";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { ZoneRowData } from "@/app/assets/data/zone";
import { createDevice, fetchDevice, fetchZone } from "../function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";

const Device = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [zone, setZone] = useState<ZoneRowData[]>([]);
  const [zoneId, setZoneId] = useState(0);
  const [page, setPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [deviceShow, setDeviceShow] = useState<DeviceRowData[]>([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const pathname = usePathname();

  const getPage = () => {
    var parts = pathname.split("/");
    var page = parts[parts.length - 1];
    return page;
  };

  const handleNextPage = () => {
    window.location.href = `/dashboard/device/${page + 1}`;
  };

  const handlePrevPage = () => {
    window.location.href = `/dashboard/device/${page - 1}`;
  };

  useEffect(() => {
    fetchZone(setZone, setZoneId);
    fetchDevice(setDeviceShow, setPage, setAllPage, getPage());
  }, []);

  const filterData: FilterMenuProps[] = [
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
  ];

  const handleZoneChange = (event: any) => {
    const selectedZoneId = parseInt(event.target.value, 10);
    setZoneId(selectedZoneId);
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Device</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p>Description</p>
              <TextInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <p>Brand</p>
              <TextInput
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <p>Price</p>
              <TextInput
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <p>Zone</p>
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
                Add
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>

      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">Device</h1>
      </div>
      <div className="flex justify-between my-4 align-middle">
        <div className="w-10/12 flex align-middle">
          <input
            type="text"
            className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
            placeholder="ค้นหา"
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
          onChange={handlePrevPage}
          disabled={page == 1}
        >
          <img src={getPublicBasePath('/svg/back-button.svg')} className="w-5 h-5" />
        </button>
        <div>
          <p className="text-center mt-2">
            {page} / {allPage}
          </p>
        </div>
        <button
          className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
          onChange={handleNextPage}
          disabled={page == allPage}
        >
          <img src={getPublicBasePath('/svg/next-button.svg')} className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Device;
