"use client";
import { StaffRowData } from "@/app/assets/data/staff";
import ResponsiveStaffTable from "@/app/components/staff/staff-table";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { createStaff, fetchStaff } from "./function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";

const Staff = () => {
  const pathname = usePathname();

  const [staff, setStaff] = useState<StaffRowData[]>([]);
  useEffect(() => {
    fetchStaff(setStaff, setPage, setAllPage);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleSelectActive = async () => {
    await fetchStaff(setStaff, setPage, setAllPage, page, "active", search);
    setStatus("active");
  };

  const handleSelectInactive = async () => {
    await fetchStaff(setStaff, setPage, setAllPage, page, "inactive", search);
    setStatus("inactive");
  };

  const filterData: FilterMenuProps[] = [
    {
      title: "ทั้งหมด",
      func: async () =>
        await fetchStaff(setStaff, setPage, setAllPage, page, status, search),
    },
    {
      title: "เฉพาะที่ใช้งาน",
      func: async () => await handleSelectActive(),
    },
    {
      title: "เฉพาะที่ไม่ได้ใช้งาน",
      func: async () => await handleSelectInactive(),
    },
  ];

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleNextPage = async () => {
    await fetchStaff(setStaff, setPage, setAllPage, page + 1);
    // window.location.href = getPublicBasePath(`/dashboard/staff/${page + 1}`);
    setPage(page + 1);
  };

  const handlePrevPage = async () => {
    await fetchStaff(setStaff, setPage, setAllPage, page - 1);
    // window.location.href = getPublicBasePath(`/dashboard/staff/${page - 1}`);
    setPage(page - 1);
  };

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
    await fetchStaff(
      setStaff,
      setPage,
      setAllPage,
      page,
      status,
      e.target.value
    );
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Staff</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>First Name</p>
              <TextInput
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Last Name</p>
              <TextInput
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <TextInput
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Mobile No</p>
              <TextInput
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>{" "}
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() => createStaff(firstName, lastName, email, phone)}
              >
                Add
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <div>
          <h1 className="text-xl font-bold">เจ้าหน้าที่</h1>
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
        <ResponsiveStaffTable data={staff} />
        <div className="mt-8 flex align-middle gap-4">
          <button
            className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={page == 1}
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
      </div>
    </>
  );
};

export default Staff;
