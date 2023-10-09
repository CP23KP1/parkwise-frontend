"use client";

import SummaryCard from "../components/summary-card";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2  pt-12 sm:ml-20 md:ml-32 xl:ml-32 gap-8 lg:gap-0">
        <SummaryCard title="รถในระบบ 🚘" unit="คัน" value="20" />
        <SummaryCard title="คาร์บอนที่ลดได้วันนี้ 🍀" unit="kgCO2e" value="2,000" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-2 md:pt-12 ml-0 md:ml-32 lg:ml-8 gap-8 lg:gap-0">
        <SummaryCard title="อุปกรณ์ที่ใช้งานอยู่" unit="เครื่อง" value="12" />
        <SummaryCard title="โซน" unit="จุด" value="3" />
        <SummaryCard title="พนักงานที่ใช้ระบบ" unit="คน" value="19" />
      </div>
    </>
  );
};

export default Dashboard;
