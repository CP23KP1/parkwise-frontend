"use client";
import { DeviceRowData } from "@/app/types/data/devices";
import ResponsiveDeviceTable from "@/app/components/devices/devices-table";
import "react-responsive-modal/styles.css";
import React, { useEffect, useState } from "react";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import FilterButton from "@/app/components/button/filter";
import TextInput from "@/app/components/input/input";
import { ZoneRowData } from "@/app/types/data/zone";
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { createDevice, fetchDevice, fetchZone } from "@/app/services/device.service";

const Device = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [zones, setZone] = useState<ZoneRowData[]>([]);
    const [zoneId, setZoneId] = useState(0);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [deviceShow, setDeviceShow] = useState<DeviceRowData[]>([]);
    const [search, setSearch] = useState("");
    const [field, setField] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setChecked(false);
        setLoading(false);
        setOpen(false);
    };

    useEffect(() => {
        fetchZone(setZone, setZoneId);
        fetchDevice(
            setDeviceShow,
            setPage,
            setAllPage,
            page,
            search,
            field,
            order
        );
    }, [page]);

    const handlePrevPage = async () => {
        await fetchDevice(setDeviceShow, setPage, setAllPage, page - 1);
        setPage(page - 1);
    };

    const handleNextPage = async () => {
        await fetchDevice(setDeviceShow, setPage, setAllPage, page + 1);
        setPage(page + 1);
    };

    const createDeviceWithValidate = () => {
        setChecked(true);
        if (name && checked && price && brand) {
            createDevice(name, description, price, brand, zoneId.toString());
            setChecked(false);
        }
    };

    const filterData: FilterMenuProps[] = [
        {
            title: "ใหม่ - เก่า",
            func: async () => {
                await fetchDevice(
                    setDeviceShow,
                    setPage,
                    setAllPage,
                    page,
                    search,
                    "createdAt",
                    "desc"
                );
                setField("createdAt");
                setOrder("desc");
            },
        },
        {
            title: "เก่า - ใหม่",
            func: async () => {
                await fetchDevice(
                    setDeviceShow,
                    setPage,
                    setAllPage,
                    page,
                    search,
                    "createdAt",
                    "asc"
                );
                setField("createdAt");
                setOrder("asc");
            },
        },
        {
            title: "ราคาถูก - แพง",
            func: async () => {
                await fetchDevice(
                    setDeviceShow,
                    setPage,
                    setAllPage,
                    page,
                    search,
                    "price",
                    "asc"
                );
                setField("price");
                setOrder("asc");
            },
        },
        {
            title: "ราคาแพง - ถูก",
            func: async () => {
                await fetchDevice(
                    setDeviceShow,
                    setPage,
                    setAllPage,
                    page,
                    search,
                    "price",
                    "desc"
                );
                setField("price");
                setOrder("desc");
            },
        },
    ];

    const handleSearch = async (e: any) => {
        setSearch(e.target.value);
        await fetchDevice(
            setDeviceShow,
            setPage,
            setAllPage,
            page,
            e.target.value,
            field,
            order
        );
    };

    const handleZoneChange = (event: any) => {
        const selectedZoneId = parseInt(event.target.value, 10);
        setZoneId(selectedZoneId);
    };

    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">เพิ่มอุปกรณ์</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ชื่อ"
                                            key="name"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            error={validateLength(
                                                name,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={name}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextInput
                                            label="คำอธิบาย"
                                            key="description"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            error={validateLength(
                                                description,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={description}
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
                                            error={validateLength(
                                                brand,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={brand}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <TextInput
                                            label="ราคา"
                                            key="price"
                                            type="number"
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            error={validateLength(
                                                price,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={price}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Select
                                            label="โซน"
                                            isRequired
                                            key="zone"
                                            onChange={handleZoneChange}
                                            value={zoneId}
                                        >
                                            {zones.map((zone) => (
                                                <SelectItem
                                                    key={zone.id}
                                                    value={zone.id}
                                                >
                                                    {zone.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
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
                                    onPress={() => createDeviceWithValidate()}
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
                <h1 className="text-xl font-bold">อุปกรณ์</h1>
            </div>
            <div className="flex justify-between my-4 align-middle">
                <div className="w-10/12 flex align-middle">
                    <Input
                        className="w-8/12 md:w-4/12 h-10"
                        type="text"
                        variant="bordered"
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
            <ResponsiveDeviceTable data={deviceShow} />
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

export default Device;
