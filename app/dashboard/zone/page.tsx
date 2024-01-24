"use client";
import { ZoneRowData } from "@/app/assets/data/zone";
import ResponsiveTable from "@/app/components/zone/zone-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import axios from "axios";
import TextInput from "@/app/components/input/input";
import { checkAuth } from "@/app/helper/auth";
import { error } from "console";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { createZone, fetchZone } from "./function";
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import { Button, Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

const Zone = () => {
    const [dataShow, setDataShow] = useState<ZoneRowData[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [createStatus, setCreateStatus] = useState(false);
    const [page, setPage] = useState(0);
    const [allPage, setAllPage] = useState(0);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [checked, setChecked] = useState(false);
    const pathname = usePathname();

    const handlePrevPage = async () => {
        await fetchZone(
            setDataShow,
            setPage,
            setAllPage,
            (page - 1).toString()
        );
        setPage(page - 1);
    };

    const handleNextPage = async () => {
        await fetchZone(
            setDataShow,
            setPage,
            setAllPage,
            (page + 1).toString()
        );
        setPage(page + 1);
    };

    const validateAndCreate = () => {
        setChecked(true);
        if (name && description && maxCapacity && address) {
            handleCreateZone();
        }
    };

    const getPage = () => {
        var parts = pathname.split("/");

        var lastPart = parts[parts.length];

        console.log(lastPart);
    };
    useEffect(() => {
        getPage();
        fetchZone(setDataShow, setPage, setAllPage);
    }, []);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [selectedLatLng, setSelectedLatLng] = useState({
        lat: 13.6512990907,
        lng: 100.493667011,
    });

    const handleLatChange = (event: any) => {
        setSelectedLatLng({
            ...selectedLatLng,
            lat: parseFloat(event.target.value) || 0,
        });
    };

    const handleLngChange = (event: any) => {
        setSelectedLatLng({
            ...selectedLatLng,
            lng: parseFloat(event.target.value) || 0,
        });
    };

    const zone = () => {
        return {
            name: name,
            description: description,
            maxCapacity: maxCapacity,
            address: address,
            latitude: selectedLatLng.lat,
            longitude: selectedLatLng.lng,
        };
    };

    const handleCreateZone = async () => {
        await createZone(
            name,
            description,
            maxCapacity,
            address,
            selectedLatLng,
            createStatus,
            setCreateStatus
        );
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });

    const handleMapClick = (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setSelectedLatLng({ lat, lng });
    };

    const filterData: FilterMenuProps[] = [
        {
            title: "ใหม่ - เก่า",
            func: async () => {
                await fetchZone(
                    setDataShow,
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
                await fetchZone(
                    setDataShow,
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
        {
            title: "รองรับมาก - น้อย",
            func: async () => {
                await fetchZone(
                    setDataShow,
                    setPage,
                    setAllPage,
                    page.toString(),
                    search,
                    "maximumCapacity",
                    "desc"
                );
                setOrderBy("maximumCapacity");
                setOrder("desc");
            },
        },
        {
            title: "รองรับน้อย - มาก",
            func: async () => {
                await fetchZone(
                    setDataShow,
                    setPage,
                    setAllPage,
                    page.toString(),
                    search,
                    "maximumCapacity",
                    "asc"
                );
                setOrderBy("maximumCapacity");
                setOrder("asc");
            },
        },
        {
            title: "ใช้งานน้อย - มาก",
            func: async () => {
                await fetchZone(
                    setDataShow,
                    setPage,
                    setAllPage,
                    page.toString(),
                    search,
                    "amount",
                    "asc"
                );
                setOrderBy("amount");
                setOrder("asc");
            },
        },
        {
            title: "ใช้งานมาก - น้อย",
            func: async () => {
                await fetchZone(
                    setDataShow,
                    setPage,
                    setAllPage,
                    page.toString(),
                    search,
                    "amount",
                    "desc"
                );
                setOrderBy("amount");
                setOrder("desc");
            },
        },
    ];

    const handleSearch = async (e: any) => {
        setSearch(e.target.value);
        await fetchZone(
            setDataShow,
            setPage,
            setAllPage,
            page.toString(),
            e.target.value,
            orderBy,
            order
        );
    };

    return (
        <>
            <Modal open={open} onClose={onCloseModal}>
                <div className="mx-10 my-4">
                    <h2 className="font-bold text-xl">สร้างโซน</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ชื่อ</p>
                            <TextInput
                                onChange={(e) => setName(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(name, 1, checked)}
                            />
                        </div>
                        <div className="pt-4">
                            <p>คำอธิบาย</p>
                            <TextInput
                                onChange={(e) => setDescription(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(description, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>รองรับได้</p>
                            <TextInput
                                type="number"
                                onChange={(e) => setMaxCapacity(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(maxCapacity, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>ที่อยู่</p>
                            <TextInput
                                onChange={(e) => setAddress(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(address, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>ละติจูด</p>
                            <TextInput
                                value={selectedLatLng.lat}
                                onChange={(e) =>
                                    handleLatChange(e.target.value)
                                }
                                disabled
                            />
                        </div>
                        <div>
                            <p>ลองติจูด</p>
                            <TextInput
                                value={selectedLatLng.lng}
                                onChange={(e) =>
                                    handleLngChange(e.target.value)
                                }
                                disabled
                            />
                        </div>
                        {isLoaded ? (
                            <>
                                <div className="places-container"></div>
                                <GoogleMap
                                    zoom={16}
                                    center={selectedLatLng}
                                    mapContainerStyle={{
                                        width: "350px",
                                        height: "350px",
                                    }}
                                    onClick={handleMapClick}
                                >
                                    <Marker
                                        position={selectedLatLng}
                                        onLoad={(marker) => {
                                            const position =
                                                marker.getPosition();
                                            if (position) {
                                                const lat = position.lat();
                                                const lng = position.lng();
                                                console.log(
                                                    "Selected Latitude:",
                                                    lat
                                                );
                                                console.log(
                                                    "Selected Longitude:",
                                                    lng
                                                );
                                                setSelectedLatLng(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        lat,
                                                        lng,
                                                    })
                                                );
                                            }
                                        }}
                                    />
                                </GoogleMap>
                            </>
                        ) : (
                            <></>
                        )}
                        <div className="flex justify-start">
                            <button
                                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                                onClick={validateAndCreate}
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
                    <h1 className="text-xl font-bold">โซนจอดรถ</h1>
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
                <ResponsiveTable data={dataShow} />
                <div className="mt-8 flex align-middle gap-4">
                    <button
                        className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
                        disabled={page == 1}
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
            </div>
        </>
    );
};

export default Zone;
