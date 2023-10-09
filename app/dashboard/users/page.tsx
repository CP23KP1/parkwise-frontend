"use client";
import { UserRowData } from "@/app/assets/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";

const User = () => {
  const data: UserRowData[] = [
    {
      id: 1,
      name: "นายใจดี มั่งมี",
      phone: "0891234567",
      email: "test@gmail.com",
      position: "เจ้าหน้าที่",
    },
    {
      id: 2,
      name: "นายใจดี มั่งมี",
      phone: "0891234567",
      email: "test@gmail.com",
      position: "เจ้าหน้าที่",
    },
  ];
  return (
    <div className="w-72 sm:w-full">
      <div>
        <h1 className="text-xl font-bold">User</h1>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
          เพิ่ม
        </button>
      </div>
      <ResponsiveUserTable data={data} />
    </div>
  );
};

export default User;
