"use client";
import React, { useEffect, useRef, useState } from "react";
import { CarRowData } from "@/app/types/data/car";
import ResponsiveCarTable from "@/app/components/cars/car-table";
import "react-responsive-modal/styles.css";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { createCar, fetchCar, fetchStaff } from "./function";
import { usePathname } from "next/navigation";
import { getPublicBasePath } from "@/app/helper/basePath";
import { StaffRowData } from "@/app/types/data/staff";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import { Select } from "@/app/components/select/select";
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

const Car = () => {
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [staff, setStaff] = useState<StaffRowData[]>([]);
    const [search, setSearch] = useState("");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

    const [car, setCar] = useState<CarRowData[]>([]);
    useEffect(() => {
        fetchCar(
            setCar,
            setPage,
            setAllPage,
            page.toString(),
            search,
            orderBy,
            order
        );
        fetchStaff(setStaff);
    }, [page]);

    const handlePrevPage = async () => {
        await fetchCar(setCar, setPage, setAllPage, (page - 1).toString());
        setPage(page - 1);
    };

    const handleNextPage = async () => {
        await fetchCar(setCar, setPage, setAllPage, (page + 1).toString());
        setPage(page + 1);
    };

    const validateAndCreate = () => {
        try {
            setLoading(true);
            setChecked(true);
            if (licensePlate && color && brand && model && year && ownerId) {
                createCar(
                    licensePlate,
                    color,
                    brand,
                    model,
                    year,
                    ownerId,
                    selectedImageFile!
                );
                setChecked(false);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
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

    const handleStaffChange = (e: any) => {
        setOwnerId(e);
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
                                <span className="text-xl">เพิ่มรถยนต์</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
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
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ป้ายทะเบียน"
                                                    key="licensePlate"
                                                    onChange={(e) => {
                                                        setLicensePlate(
                                                            e.target.value
                                                        );
                                                    }}
                                                    error={validateLength(
                                                        licensePlate,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={licensePlate}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="สี"
                                                    key="color"
                                                    onChange={(e) =>
                                                        setColor(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        color,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={color}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="แบรนด์"
                                                    key="brand"
                                                    onChange={(e) =>
                                                        setBrand(e.target.value)
                                                    }
                                                    error={checked}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={brand}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="รุ่น"
                                                    key="model"
                                                    onChange={(e) =>
                                                        setModel(e.target.value)
                                                    }
                                                    error={checked}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={model}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ปีที่ผลิต"
                                                    key="year"
                                                    onChange={(e) =>
                                                        setYear(e.target.value)
                                                    }
                                                    error={checked}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={year}
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
                <h1 className="text-xl font-bold">รถยนต์</h1>
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
                <Button color="primary" onClick={onOpenModal} variant="shadow">
                    เพิ่ม
                </Button>
            </div>
            <ResponsiveCarTable data={car} />
            <div className="mt-8 flex justify-end align-middle gap-4">
                <Pagination
                    isCompact
                    showControls
                    total={allPage}
                    initialPage={page}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </>
    );
};
export default Car;
