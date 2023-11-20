"use client";
import React, { useState } from "react";
import { CarRowData } from "@/app/assets/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import { getPublicBasePath } from "@/app/helper/basePath";

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
  ]

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
      <ResponsiveCarTable data={data} />
      <div className="mt-8 flex align-middle gap-4">
        <button className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
          <img src={getPublicBasePath('/svg/back-button.svg')} className="w-5 h-5" />
        </button>
        <div>
          <p className="text-center mt-2">1 / 14</p>
        </div>
        <button className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
          <img src={getPublicBasePath('/svg/next-button.svg')} className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
export default Car;
