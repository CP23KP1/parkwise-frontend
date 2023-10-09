"use client";
import ResponsiveCarbonTable from "@/app/components/carbon/carbon-table";
import SummaryCard from "@/app/components/summary-card";

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
        <ResponsiveCarbonTable data={data} />
      </div>
    </div>
  );
};

export default Carbon;
