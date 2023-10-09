"use client";
import ResponsiveParkingTable from "@/app/components/parking/parking-table";

const Parking = () => {
  const data: ParkingRowData[] = [
    {
      id: 1,
      name: "ที่จอดทั่วไป",
      amount: 20,
      zone: "ตึก FIBO",
      description: "ตึก FIBO",
    },
    {
      id: 2,
      name: "ที่จอดสำรองผู้แำนวยการ",
      amount: 2,
      zone: "ตึก FIBO",
      description: "ตึก FIBO",
    },
  ];
  return (
    <div className="w-72 sm:w-full">
      <div>
        <h1 className="text-xl font-bold">Parking</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveParkingTable data={data} />
    </div>
  );
};

export default Parking;
