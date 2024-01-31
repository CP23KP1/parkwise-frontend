"use client";
import { StaffRowData } from "@/app/assets/data/staff";
import ResponsiveStaffTable from "@/app/components/staff/staff-table";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import { createStaff, fetchStaff } from "./function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import {
    validateEmail,
    validateEmailWording,
    validateLength,
    validatePhone,
    validatePhoneWording,
} from "@/app/helper/validate";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import TextInput from "@/app/components/input/input";
import { FaAirbnb, FaPerson } from "react-icons/fa6";

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
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelectActive = async () => {
        await fetchStaff(setStaff, setPage, setAllPage, page, "active", search);
        setStatus("active");
    };

    const handleSelectInactive = async () => {
        await fetchStaff(
            setStaff,
            setPage,
            setAllPage,
            page,
            "inactive",
            search
        );
        setStatus("inactive");
    };

    const filterData: FilterMenuProps[] = [
        {
            title: "ทั้งหมด",
            func: async () =>
                await fetchStaff(
                    setStaff,
                    setPage,
                    setAllPage,
                    page,
                    status,
                    search
                ),
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

    const handleClickCheck = () => {
        setChecked(true);
        if (firstName && lastName && email && phone) {
            createStaff(firstName, lastName, email, phone);
        }
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
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    เพิ่มเจ้าหน้าที่
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-1">
                                        <TextInput
                                            label="ชื่อจริง"
                                            key="firstname"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={firstName}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <TextInput
                                            label="นามสกุล"
                                            key="lastname"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={lastName}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextInput
                                            label="อีเมลล์"
                                            key="email"
                                            type="email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={email}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextInput
                                            label="เบอร์โทรศัพท์"
                                            key="phone"
                                            type="text"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={phone}
                                            isRequired
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    ปิด
                                </Button>
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    onPress={() => handleClickCheck()}
                                    isLoading={loading}
                                >
                                    เพิ่ม
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="w-72 sm:w-full">
                <div>
                    <h1 className="text-xl font-bold">เจ้าหน้าที่</h1>
                </div>
                <div className="flex justify-between my-4 align-middle">
                    <div className="w-10/12 flex align-middle">
                        <Input
                            className="w-8/12 md:w-4/12 h-10"
                            variant="bordered"
                            type="email"
                            placeholder="ค้นหา"
                            labelPlacement="outside"
                            startContent={
                                <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={handleSearch}
                        />
                        <div className="mt-2 ml-2">
                            <FilterButton data={filterData as never} />
                        </div>
                    </div>
                    <Button
                        color="primary"
                        onClick={onOpenModal}
                        variant="shadow"
                    >
                        เพิ่ม
                    </Button>
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
