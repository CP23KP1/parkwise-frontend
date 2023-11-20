// @ts-nocheck
"use client";
import DeleteModal from "@/app/components/modal/delete-modal";
import ResponsiveParkingTable from "@/app/components/parking/parking-table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import Modal from "react-responsive-modal";
import FilterButton, {
  FilterButtonProps,
} from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";

const Parking = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const data: ParkingRowData[] = [
    {
      id: 1,
      name: "ที่จอดทั่วไป",
      amount: 20,
      zone: "ตึก FIBO",
      description: "ตึก FIBO",
    },
    {
      id: 2,
      name: "ที่จอดสำรองผู้อำนวยการ",
      amount: 2,
      zone: "ตึก FIBO",
      description: "ตึก FIBO",
    },
  ];

  const filterData: FilterButtonProps = [
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
          <h2 className="font-bold text-xl">Create Parking</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <TextInput />
            </div>
            <div>
              <p>Description</p>
              <TextInput />
            </div>
            <div>
              <p>Amount</p>
              <TextInput />
            </div>
            <div>
              <p>Zone</p>
              <TextInput />
            </div>{" "}
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
          <h1 className="text-xl font-bold">Parking</h1>
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
        <ResponsiveParkingTable data={data} />
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
      </div>
    </>
  );
};

export default Parking;
