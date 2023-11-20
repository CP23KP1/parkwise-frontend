"use client";
import React, { useEffect, useState } from "react";
import { CarRowData } from "@/app/assets/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { createCar, fetchCar } from "../function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";

const Car = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [car, setCar] = useState<CarRowData[]>([]);
  const [page, setPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const pathname = usePathname();

  const getPage = () => {
    var parts = pathname.split("/");
    var page = parts[parts.length - 1];
    return page;
  };

  const handleNextPage = () => {
    window.location.href = `/dashboard/car/${page + 1}`;
  };

  const handlePrevPage = () => {
    window.location.href = `/dashboard/car/${page - 1}`;
  };

  useEffect(() => {
    fetchCar(setCar, setPage, setAllPage, getPage());
  }, []);

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
              <TextInput
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Color</p>
              <TextInput onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Brand</p>
              <TextInput onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Model</p>
              <TextInput onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Year</p>
              <TextInput onChange={(e) => setYear(e.target.value)} />
            </div>
            <div>
              <p>Owner</p>
              <TextInput onChange={(e) => setOwnerId(e.target.value)} />
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  createCar(licensePlate, color, brand, model, year, ownerId)
                }
              >
                Create
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
      <ResponsiveCarTable data={car} />
      <div className="mt-8 flex align-middle gap-4">
        <button
          className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={page == 1}
        >
          <img src={getPublicBasePath('/svg/back-button.svg')} className="w-5 h-5" />
        </button>
        <div>
          <p className="text-center mt-2">
            {page} / {allPage}
          </p>
        </div>
        <button
          className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={page == allPage}
        >
          <img src={getPublicBasePath('/svg/next-button.svg')} className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
export default Car;
