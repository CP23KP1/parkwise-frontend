"use client";
import { ZoneRowData } from "@/app/assets/data/zone";
import ResponsiveTable from "@/app/components/table";

const Zone = () => {
  const data: ZoneRowData[] = [
    { id: 1, name: "ใต้อาคาร LX", avaliable: 30, service: 12 },
    { id: 2, name: "ตึก FIBO", avaliable: 25, service: 9 },
  ];
  return (
    <div className="w-72 sm:w-full">
      <div>
        <h1 className="text-xl font-bold">Zone</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveTable data={data} />
      <style jsx>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export default Zone;
