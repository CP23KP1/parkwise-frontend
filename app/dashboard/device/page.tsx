"use client";
import { DeviceRowData } from "@/app/assets/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState } from "react";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";

const Device = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const data: DeviceRowData[] = [
    {
      id: 1,
      name: "RFID Reader",
      description: "RFID Reader",
      zone: "ตึก FIBO",
      price: 1000,
    },
    {
      id: 2,
      name: "RFID Tag",
      description: "RFID Tag",
      zone: "ใต้ LX",
      price: 200,
    },
  ];

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

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Device</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>คำอธิบาย</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>ราคา</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>โซน</p>
              <select className="border-2 border-solid border-gray-600 w-80 h-10">
                <option>ใต้ตึก LX</option>
                <option>ตึก FIBO</option>
              </select>
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                เพิ่ม
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
      <ResponsiveDeviceTable data={data} />
      <div className="mt-8 flex align-middle gap-4">
        <button className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
          <img src="/svg/back-button.svg" className="w-5 h-5" />
        </button>
        <div>
          <p className="text-center mt-2">1 / 14</p>
        </div>
        <button className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
          <img src="/svg/next-button.svg" className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Device;
