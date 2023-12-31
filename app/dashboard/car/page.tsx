"use client";
import React, { useEffect, useState } from "react";
import { CarRowData } from "@/app/assets/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { createCar, fetchCar, fetchStaff } from "./function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";
import { StaffRowData } from "@/app/assets/data/staff";

const Car = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [page, setPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [staff, setStaff] = useState<StaffRowData[]>([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [car, setCar] = useState<CarRowData[]>([]);
  useEffect(() => {
    fetchCar(setCar, setPage, setAllPage, "1", search, orderBy, order);
    fetchStaff(setStaff);
  }, []);

  const handlePrevPage = async () => {
    await fetchCar(setCar, setPage, setAllPage, (page - 1).toString());
    setPage(page - 1);
  };

  const handleNextPage = async () => {
    await fetchCar(setCar, setPage, setAllPage, (page + 1).toString());
    setPage(page + 1);
  };

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
    fetchCar(
      setCar,
      setPage,
      setAllPage,
      page.toString(),
      e.target.value,
      orderBy,
      order
    );
  };

  const filterData: FilterMenuProps[] = [
    {
      title: "ใหม่ - เก่า",
      func: async () => {
        await fetchCar(
          setCar,
          setPage,
          setAllPage,
          page.toString(),
          search,
          "createdAt",
          "desc"
        );
        setOrderBy("createdAt");
        setOrder("desc");
      },
    },
    {
      title: "เก่า - ใหม่",
      func: async () => {
        await fetchCar(
          setCar,
          setPage,
          setAllPage,
          page.toString(),
          search,
          "createdAt",
          "asc"
        );
        setOrderBy("createdAt");
        setOrder("asc");
      },
    },
  ];

  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
    setOwnerId(staff[0].id.toString());
  };
  const onCloseModal = () => setOpen(false);

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnerId(e.target.value);
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">สร้างรถยนต์</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ป้ายทะเบียน</p>
              <TextInput
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>สี</p>
              <TextInput onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>แบรนด์</p>
              <TextInput onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>รุ่น</p>
              <TextInput onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>ปี</p>
              <TextInput
                type="number"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>เจ้าของ</p>
              <select
                className="border-2 border-solid border-gray-600 w-80 h-10"
                onChange={handleStaffChange}
              >
                {staff.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.firstname + " " + data.lastname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  createCar(licensePlate, color, brand, model, year, ownerId)
                }
              >
                สร้าง
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <h1 className="text-xl font-bold">รถยนต์</h1>
      </div>
      <div className="flex justify-between my-4 align-middle">
        <div className="w-10/12 flex align-middle">
          <input
            type="text"
            className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
            placeholder="ค้นหา"
            onChange={(e) => handleSearch(e)}
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
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          <img
            src={getPublicBasePath("/svg/back-button.svg")}
            className="w-5 h-5"
          />
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
          <img
            src={getPublicBasePath("/svg/next-button.svg")}
            className="w-5 h-5"
          />
        </button>
      </div>
    </>
  );
};
export default Car;
