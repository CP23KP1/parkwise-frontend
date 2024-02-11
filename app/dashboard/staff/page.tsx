"use client";
import { StaffRowData } from "@/app/types/data/staff";
import ResponsiveStaffTable from "@/app/components/staff/staff-table";
import React, { useEffect, useRef, useState } from "react";
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
    Avatar,
    Button,
    CircularProgress,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Tooltip,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import TextInput from "@/app/components/input/input";
import { FaAirbnb, FaPerson } from "react-icons/fa6";

const Staff = () => {
    const pathname = usePathname();

    const [staff, setStaff] = useState<StaffRowData[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

    useEffect(() => {
        fetchStaff(setStaff, setPage, setAllPage, page, "all", undefined);
    }, [page]);

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

    const handleClickCheck = () => {
        setChecked(true);
        if (firstName && lastName && email && phone) {
            createStaff(
                firstName,
                lastName,
                email,
                phone,
                position,
                selectedImageFile!
            );
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

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
        if (file) {
            const reader = new FileReader() as any;
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
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
                                        <div className="h-full flex flex-row justify-center items-center p-2">
                                            <input
                                                className="hidden"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={inputRef}
                                                placeholder="Upload Image"
                                            />

                                            <Tooltip
                                                color="primary"
                                                content="Edit Car Image"
                                                className="capitalize text-white"
                                            >
                                                {isUploadImageLoading ? (
                                                    <CircularProgress
                                                        color="primary"
                                                        aria-label="Loading..."
                                                    />
                                                ) : (
                                                    <Avatar
                                                        className="hover:cursor-pointer w-32 h-32"
                                                        isBordered
                                                        color="primary"
                                                        src={
                                                            selectedImage ??
                                                            "https://images.unsplash.com/broken"
                                                        }
                                                        onClick={() => {
                                                            inputRef.current.click();
                                                        }}
                                                    ></Avatar>
                                                )}
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="ชื่อจริง"
                                                    key="firstname"
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={false}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={firstName}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="นามสกุล"
                                                    key="lastname"
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={false}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
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
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
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
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={phone}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ตำแหน่ง"
                                                    key="position"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setPosition(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={false}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={phone}
                                                    isRequired
                                                />
                                            </div>
                                        </div>
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

export default Staff;
