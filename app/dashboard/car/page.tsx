"use client";
import React, { useState } from "react";
import { CarRowData } from "@/app/assets/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Car = () => {
  const data: CarRowData[] = [
    {
      id: 1,
      carPlate: "กก-123 กทม",
      brand: "Toyota",
      model: "Yaris",
      year: 2019,
      color: "White",
      owner: "นายรุ่งเรื่อง ใจดี",
    },
    {
      id: 2,
      carPlate: "กข-2314 ชลบุรี",
      brand: "Toyota",
      model: "Yaris",
      year: 2019,
      color: "White",
      owner: "นายมั่นคง มั่งคั่ง",
    },
  ];

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Car</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>License Plate</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>Color</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>Brand</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>Model</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>Year</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Owner</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                Edit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">Car</h1>
      </div>
      <div className="flex justify-end">
        <button
          className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
          onClick={onOpenModal}
        >
          Add
        </button>
      </div>
      <ResponsiveCarTable data={data} />
    </>
  );
};
export default Car;
