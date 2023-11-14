"use client";
import { LogsRowData } from "@/app/assets/data/logs";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import ResponsiveLogsTable from "@/app/components/logs/logs-table";

const Logs = () => {
  const data: LogsRowData[] = [
    {
      id: 1,
      owner: "นายใจดี มั่งมี",
      carPlate: "กข-452 ตาก",
      details: "Toyaota สีขาว",
      datetime: "จันทร์ 13 กันยายน 2566 เวลา 10:21",
      position: "อาจารย์",
    },
    {
      id: 2,
      owner: "นายเจริญ สุขใจ",
      carPlate: "จภ-3214 กรุงเทพ",
      details: "Honda สีดำ",
      datetime: "จันทร์ 13 กันยายน 2566 เวลา 9:20",
      position: "พนักงานมหาวิทยาลัย",
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
    <div className="w-full pl-10 md:pl-0">
      <div>
        <h1 className="text-xl font-bold">Logs</h1>
        <select className="form-select block border-solid border-2 rounded-md w-32 h-10 border-gray-600 my-4">
          <option>โซน 1</option>
          <option>โซน 2</option>
          <option>โซน 3</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div>
          <div className="w-full text-center md:w-96 flex justify-center">
            <img
              className="text-center"
              src="https://www.fresh222.com/wp-content/uploads/2020/05/RFID-Parking-Systems-Des-Plaines-IL-USA.jpg"
            />
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <h1 className="text-base md:text-xl font-bold">ใช้งานล่าสุด</h1>
          <div className="mt-8 grid grid-cols-2 gap-y-4">
            <h1 className="text-base md:text-xl">รถยนต์ทะเบียน: </h1>
            <h1 className="text-base md:text-xl">กข-678</h1>
            <h1 className="text-base md:text-xl">ชื่อผู้ใช้บริการ: </h1>
            <h1 className="text-base md:text-xl">นายร่ำรวย มั่งมี</h1>
            <h1 className="text-base md:text-xl">เวลาที่เข้าใช้บริการ: </h1>
            <h1 className="text-base md:text-xl">14:02 น.</h1>
            <h1 className="text-base md:text-xl">ตามคำแนะนำหรือไม่: </h1>
            <h1 className="text-base md:text-xl">ใช่</h1>
          </div>
        </div>
      </div>
      <div className="mt-4">
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
        <ResponsiveLogsTable data={data} />
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
      </div>
    </div>
  );
};

export default Logs;
