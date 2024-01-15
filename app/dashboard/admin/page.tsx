"use client";
import React, { useEffect, useState } from "react";
import { UserRowData } from "@/app/assets/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { createUser, fetchUsers } from "./function";
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateEmail, validateEmailWording, validateLength, validatePassword } from "@/app/helper/validate";

const User = () => {
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
  const [search, setSearch] = useState("");
  const [orderField, setOrderField] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    fetchUsers(setUsers, setPage, setAllPage, page, search, orderField, order);
  }, []);

  const filterData: FilterMenuProps[] = [
    {
      title: "ใหม่ - เก่า",
      func: async () => {
        await fetchUsers(
          setUsers,
          setPage,
          setAllPage,
          page,
          search,
          "createdAt",
          "desc"
        );
        setOrderField("createdAt");
        setOrder("desc");
      },
    },
    {
      title: "เก่า - ใหม่",
      func: async () => {
        await fetchUsers(
          setUsers,
          setPage,
          setAllPage,
          page,
          search,
          "createdAt",
          "asc"
        );
        setOrderField("createdAt");
        setOrder("asc");
      },
    },
  ];

  const handleNextPage = async () => {
    await fetchUsers(
      setUsers,
      setPage,
      setAllPage,
      parseInt(page.toString()) + 1
    );
    setPage(parseInt(page.toString()) + 1);
  };

  const handlePrevPage = async () => {
    await fetchUsers(
      setUsers,
      setPage,
      setAllPage,
      parseInt(page.toString()) - 1
    );
    setPage(parseInt(page.toString()) - 1);
  };

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
    await fetchUsers(
      setUsers,
      setPage,
      setAllPage,
      page,
      e.target.value,
      orderField,
      order
    );
  };

  const validateAndCreate = () => {
    setChecked(true);
    if (email && password && firstName && lastName) {
      createUser(email, password, firstName, lastName);
    }
  }
  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">สร้างผู้ดูแลระบบ</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput onChange={(e) => setFirstName(e.target.value)} 
              error={validateLength(firstName, 1, checked)}
              errorMessage={CAN_NOT_BE_EMPTY}
              />
            </div>
            <div className="pt-4">
              <p>นามสกุล</p>
              <TextInput
                onChange={(e) => setLastName(e.target.value)}
                error={validateLength(lastName, 1, checked)}
                errorMessage={CAN_NOT_BE_EMPTY}
              />
            </div>
            <div>
              <p>อีเมล</p>
              <TextInput
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={validateEmailWording(email)}
                error={validateEmail(email, checked)}
              />
            </div>
            <div className="pt-4">
              <p>รหัสผ่าน</p>
              <TextInput
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validatePassword(password, checked)}
              />
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() => validateAndCreate()}
              >
                เพิ่ม
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <div>
          <h1 className="text-xl font-bold">ผู้ดูแลระบบ</h1>
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
        <ResponsiveUserTable data={users} />
        <div className="mt-8 flex align-middle gap-4">
          <button
            className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={page === 1}
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

export default User;
