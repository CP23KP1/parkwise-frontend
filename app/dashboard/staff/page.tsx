"use client";
import { StaffRowData } from "@/app/assets/data/staff";
import ResponsiveStaffTable from "@/app/components/staff/staff-table";

const Staff = () => {
  const data: StaffRowData[] = [
    {
      id: 1,
      name: "นายใจดี มั่งมี",
      phone: "0891234567",
      carOwn: ["กข-1234", "กข-5678"],
      email: "jaidee@kmutt.ac.th",
      service: true,
      position: "พนักงานมหาวิทยาลัย",
    },
    {
      id: 2,
      name: "นายเจริญ สุขใจ",
      phone: "0891234568",
      carOwn: ["ขค-1234", "ขค-5678"],
      email: "jaroen@kmutt.ac.th",
      service: true,
      position: "อาจารย์",
    },
  ];
  return (
    <div className="w-72 sm:w-full">
      <div>
        <h1 className="text-xl font-bold">Staff</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveStaffTable data={data} />
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

export default Staff;
