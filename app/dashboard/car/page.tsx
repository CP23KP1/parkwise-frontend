"use client";
import { CarRowData } from "@/app/assets/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";

const Car = () => {
  const data: CarRowData[] = [
    {
      id: 1,
      carPlate: "กก-123 กทม",
      description: "Toyota Yaris 2019",
      owner: "นายรุ่งเรื่อง ใจดี",
    },
    {
      id: 2,
      carPlate: "กข-2314 ชลบุรี",
      description: "Toyota Yaris 2019",
      owner: "นายมั่นคง มั่งคั่ง",
    },
  ];
  return (
    <>
      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">Car</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveCarTable data={data} />
    </>
  );
};
export default Car;
