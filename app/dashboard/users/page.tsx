"use client";
import React, { useState } from "react";
import { UserRowData } from "@/app/assets/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";

const User = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const data: UserRowData[] = [
    {
      id: 1,
      firstName: "ใจดี",
      lastName: "มั่งมี",
      phone: "0891234567",
      email: "test@gmail.com",
    },
    {
      id: 2,
      firstName: "ใจดี",
      lastName: "มั่งมี",
      phone: "0891234567",
      email: "test@gmail.com",
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
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create User</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>First Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>Last Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Mobile No</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                Add
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <div>
          <h1 className="text-xl font-bold">User</h1>
        </div>
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
          <button
            className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
            onClick={onOpenModal}
          >
            เพิ่ม
          </button>
        </div>
        <ResponsiveUserTable data={data} />
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
    </>
  );
};

export default User;
