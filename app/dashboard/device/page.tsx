"use client";
import { DeviceRowData } from "@/app/assets/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";

const Device = () => {
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
      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">Device</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveDeviceTable data={data} />
    </>
  );
};

export default Device;
