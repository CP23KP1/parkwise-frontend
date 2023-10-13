"use client";
import React, { useState } from "react";
import { UserRowData } from "@/app/assets/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const User = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
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
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create User</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Position</p>
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
        <div className="flex justify-end">
          <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white" onClick={onOpenModal}>
            Add
          </button>
        </div>
        <ResponsiveUserTable data={data} />
      </div>
    </>
  );
};

export default User;
