"use client";
import React, { useEffect, useState } from "react";
import { UserRowData } from "@/app/types/data/user";
import ResponsiveUserTable from "@/app/components/users/user-table";
import "react-responsive-modal/styles.css";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { createUser, fetchUsers } from "./function";
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY, EMAIL_INVALID } from "@/app/helper/wording";
import {
    validateEmail,
    validateEmailWording,
    validateLength,
    validatePassword,
} from "@/app/helper/validate";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

const User = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [users, setUsers] = useState<UserRowData[]>([]);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [search, setSearch] = useState("");
    const [orderField, setOrderField] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers(
            setUsers,
            setPage,
            setAllPage,
            page,
            search,
            orderField,
            order
        );
    }, [page]);

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
    };
    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    เพิ่มผู้ดูแลระบบ
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
                                            error={validateLength(
                                                firstName,
                                                1,
                                                checked
                                            )}
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
                                            error={validateLength(
                                                lastName,
                                                1,
                                                checked
                                            )}
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
                                            error={validateEmail(
                                                email,
                                                checked
                                            )}
                                            errorMessage={EMAIL_INVALID}
                                            value={email}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <TextInput
                                            label="รหัสผ่าน"
                                            key="password"
                                            type="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={password}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <TextInput
                                            label="ยืนยันรหัสผ่าน"
                                            key="password"
                                            type="password"
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            error={false}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={confirmPassword}
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
                                    onPress={() => validateAndCreate()}
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
                    <h1 className="text-xl font-bold">ผู้ดูแลระบบ</h1>
                </div>
                <div className="flex justify-between my-4 align-middle">
                    <div className="w-10/12 flex align-middle">
                        <Input
                            className="w-8/12 md:w-4/12 h-10"
                            variant="bordered"
                            type="text"
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
                <ResponsiveUserTable data={users} />
                <div className="mt-8 flex justify-end align-middle gap-4">
                    <Pagination
                        isCompact
                        showControls
                        total={allPage}
                        initialPage={page}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </>
    );
};

export default User;
