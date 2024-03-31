"use client";
import { ZoneRowData } from "@/app/types/data/zone";
import ResponsiveTable from "@/app/components/zone/zone-table";
import "react-responsive-modal/styles.css";
import React, { useState, useEffect, useRef } from "react";
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
import { getPublicBasePath } from "@/app/helper/basePath";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { inValidateLength } from "@/app/helper/validate";
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
import { displayImageUrlWithSelectedImage } from "@/app/helper/display-image";
import { createZone, fetchZone } from "@/app/services/zone.service";
import { ZONE_PAGE } from "@/app/common/data/meta.data";
import Head from "next/head";

const Zone = () => {
    const [dataShow, setDataShow] = useState<ZoneRowData[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [createStatus, setCreateStatus] = useState(false);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [checked, setChecked] = useState(false);
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

    const validateAndCreate = async () => {
        setChecked(true);
        setLoading(true);

        const isZoneNameInValidated = inValidateLength(name, 1, checked);
        const isAddressInValidated = inValidateLength(address, 1, checked);
        const isMaxCapacityInValidated = inValidateLength(
            maxCapacity,
            1,
            checked
        );

        if (
            !isZoneNameInValidated &&
            !isAddressInValidated &&
            !isMaxCapacityInValidated
        ) {
            await createZone(
                name,
                description,
                maxCapacity,
                address,
                selectedLatLng,
                createStatus,
                setCreateStatus,
                selectedImageFile!
            );
        }
        setLoading(false);
    };

    const getPage = () => {
        var parts = pathname.split("/");

        var lastPart = parts[parts.length];

        console.log(lastPart);
    };
    useEffect(() => {
        getPage();
        fetchZone(setDataShow, setPage, setAllPage, page.toString());
    }, [page]);

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setName("");
        setDescription("");
        setMaxCapacity("");
        setAddress("");
        setSelectedImage(null);
        setSelectedImageFile(null);
        setChecked(false);
        setOpen(false);
    };

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
            <Head>
                <title>{ZONE_PAGE.title}</title>
                <meta name="description" content={ZONE_PAGE.description} />
            </Head>
            <Modal isOpen={open} onClose={onCloseModal} size="4xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">เพิ่มโซน</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="col-span-1">
                                        <div className="flex h-full items-center">
                                            {isLoaded ? (
                                                <>
                                                    <div className="places-container"></div>
                                                    <GoogleMap
                                                        zoom={16}
                                                        center={selectedLatLng}
                                                        mapContainerStyle={{
                                                            width: "100%",
                                                            height: "350px",
                                                        }}
                                                        onClick={handleMapClick}
                                                    >
                                                        <Marker
                                                            position={
                                                                selectedLatLng
                                                            }
                                                            onLoad={(
                                                                marker
                                                            ) => {
                                                                const position =
                                                                    marker.getPosition();
                                                                if (position) {
                                                                    const lat =
                                                                        position.lat();
                                                                    const lng =
                                                                        position.lng();
                                                                    setSelectedLatLng(
                                                                        (
                                                                            prevState
                                                                        ) => ({
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
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                            <div className="col-span-2">
                                                <div className="h-full flex flex-row justify-center items-center p-2">
                                                    <input
                                                        className="hidden"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        ref={inputRef}
                                                        placeholder="Upload Image"
                                                    />

                                                    <Tooltip
                                                        color="primary"
                                                        content="Edit Zone Image"
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
                                                                src={displayImageUrlWithSelectedImage(
                                                                    selectedImage!
                                                                )}
                                                                onClick={() => {
                                                                    inputRef.current.click();
                                                                }}
                                                            ></Avatar>
                                                        )}
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ชื่อ"
                                                    key="name"
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    error={inValidateLength(
                                                        name,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={name}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="คำอธิบาย"
                                                    key="description"
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={description}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ที่อยู่"
                                                    key="address"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={inValidateLength(
                                                        address,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={address}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="รองรับได้"
                                                    key="maxCapacity"
                                                    type="number"
                                                    onChange={(e) =>
                                                        setMaxCapacity(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={inValidateLength(
                                                        maxCapacity.toString(),
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={maxCapacity}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="ละติจูด"
                                                    key="latitude"
                                                    type="number"
                                                    onChange={(e) =>
                                                        handleLatChange(e)
                                                    }
                                                    error={inValidateLength(
                                                        selectedLatLng.lat?.toString(),
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={
                                                        selectedLatLng.lat?.toString() ||
                                                        ""
                                                    }
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="ลองติจูด"
                                                    key="longitude"
                                                    type="number"
                                                    onChange={(e) =>
                                                        handleLngChange(e)
                                                    }
                                                    error={inValidateLength(
                                                        selectedLatLng.lng?.toString(),
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={
                                                        selectedLatLng.lng?.toString() ||
                                                        ""
                                                    }
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
                                    isDisabled={loading}
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

export default Zone;
