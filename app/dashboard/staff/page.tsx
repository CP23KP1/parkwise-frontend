"use client";
import { StaffRowData } from "@/app/assets/data/staff";
import ResponsiveStaffTable from "@/app/components/staff/staff-table";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Staff = () => {
  const data: StaffRowData[] = [
    {
      id: 1,
      firstName: "ใจดี",
      lastName: "มั่งมี",
      phone: "0891234567",
      carOwn: ["กข-1234", "กข-5678"],
      email: "jaidee@kmutt.ac.th",
      service: true,
      position: "พนักงานมหาวิทยาลัย",
    },
    {
      id: 2,
      firstName: "เจริญ",
      lastName: "สุขใจ",
      phone: "0891234568",
      carOwn: ["ขค-1234", "ขค-5678"],
      email: "jaroen@kmutt.ac.th",
      service: true,
      position: "อาจารย์",
    },
  ];
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Staff</h2>
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
            </div>{" "}
            <div>
              <p>Car Own <br/><p className="text-sm">(Example Input: กข-2343 กทม, ขค-2145 ชลบุรี)</p></p>
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
          <h1 className="text-xl font-bold">Staff</h1>
        </div>
        <div className="flex justify-end">
          <button
            className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
            onClick={onOpenModal}
          >
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
    </>
  );
};

export default Staff;
