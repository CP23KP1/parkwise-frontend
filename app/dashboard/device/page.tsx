"use client";
import { DeviceRowData } from "@/app/assets/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState } from "react";

const Device = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const data: DeviceRowData[] = [
    {
      id: 1,
      name: "RFID Reader",
      description: "RFID Reader",
      price: 1000,
    },
    {
      id: 2,
      name: "RFID Tag",
      description: "RFID Tag",
      price: 200,
    },
  ];
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Device</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Price</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
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
      <div className="flex justify-end">
        <button
          className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
          onClick={onOpenModal}
        >
          Add
        </button>
      </div>
      <ResponsiveDeviceTable data={data} />
    </>
  );
};

export default Device;
