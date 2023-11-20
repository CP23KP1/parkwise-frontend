"use client";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import ResponsiveCarbonTable from "@/app/components/carbon/carbon-table";
import SummaryCard from "@/app/components/summary-card";
import { getPublicBasePath } from "@/app/helper/basePath";

const Carbon = () => {
  const data: CarbonRowData[] = [
    {
      id: 1,
      carPlate: "AB-1234",
      from: "ใต้ LX",
      destination: "ตึก FIBO",
      amount: 20,
    },
    {
      id: 2,
      carPlate: "CD-5678",
      from: "ใต้ LX",
      destination: "ตึก FIBO",
      amount: 20,
    },
    {
      id: 3,
      carPlate: "EF-9012",
      from: "ตึก FIBO",
      destination: "ใต้ LX",
      amount: 20,
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
    <div className="table-container mt-8 w-72 sm:w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <SummaryCard
          title="คาร์บอนที่ลดได้วันนี้ 🍀"
          unit="kgCO2e"
          value="20"
        />
        <SummaryCard title="แนะนำที่จอดรถวันนี้ 🅿️" unit="คัน" value="212" />
        <SummaryCard title="ระบบแนะนำได้ 🚖" unit="คัน" value="10" />
      </div>
      <div className="mt-10">
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
        </div>
        <ResponsiveCarbonTable data={data} />
        <div className="mt-8 flex align-middle gap-4">
          <button className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
            <img src={getPublicBasePath('/svg/back-button.svg')} className="w-5 h-5" />
          </button>
          <div>
            <p className="text-center mt-2">1 / 14</p>
          </div>
          <button className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
            <img src={getPublicBasePath('/svg/next-button.svg')} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carbon;
