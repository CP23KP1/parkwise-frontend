"use client";
import React, { useEffect, useState } from "react";
import { UserRowData } from "@/app/assets/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { getPublicBasePath } from "@/app/helper/basePath";
import { createUser, fetchUsers } from "../function";
import { usePathname } from "next/navigation";

const Admin = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState<UserRowData[]>([]);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const pathname = usePathname();

  const getPage = () => {
    var parts = pathname.split("/");
    var page = parts[parts.length - 1];
    return page;
  };
  useEffect(() => {
    fetchUsers(setUsers, setPage, setAllPage, getPage());
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

  const handleNextPage = () => {
    window.location.href = getPublicBasePath(`/dashboard/admin/${page + 1}`);
  }

  const handlePrevPage = () => {
    window.location.href = getPublicBasePath(`/dashboard/admin/${page - 1}`);
  }
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create User</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>First Name</p>
              <TextInput onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Last Name</p>
              <TextInput onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <p>Email</p>
              <TextInput onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Password</p>
              <TextInput
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() => createUser(email, password, firstName, lastName)}
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
          <h1 className="text-xl font-bold">Admin</h1>
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
        <ResponsiveUserTable data={users} />
        <div className="mt-8 flex align-middle gap-4">
          <button className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
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
          <button className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
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

export default Admin;
