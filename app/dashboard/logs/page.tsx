"use client"
import { LogsRowData } from "@/app/assets/data/logs";
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
  return (
    <div className="w-full pl-10 md:pl-0">
      <div >
        <h1 className="text-xl font-bold">Logs</h1>
        <select className="form-select block border-solid border-2 rounded-md w-32 h-10 border-gray-600 my-4">
          <option>Zone 1</option>
          <option>Zone 2</option>
          <option>Zone 3</option>
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
      <ResponsiveLogsTable data={data}/>
      </div>
    </div>
  );
};

export default Logs;
