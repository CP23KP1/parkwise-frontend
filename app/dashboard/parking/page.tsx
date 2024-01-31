"use client";
import DeleteModal from "@/app/components/modal/delete-modal";
import ResponsiveParkingTable from "@/app/components/parking/parking-table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import FilterButton, {
    FilterButtonProps,
} from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import TextInput from "@/app/components/input/input";
import { getPublicBasePath } from "@/app/helper/basePath";
import { createParking, fetchParking } from "./function";
import { fetchZone } from "../device/function";
import { validateLength } from "@/app/helper/validate";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { IoIosSearch } from "react-icons/io";
import {
    Modal,
    Button,
    Input,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    Pagination,
} from "@nextui-org/react";
import { ZoneRowData } from "@/app/assets/data/zone";

const Parking = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [parking, setParking] = useState<ParkingRowData[]>([]);
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [zones, setZone] = useState<ZoneRowData[]>([]);
    const [zoneId, setZoneId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("0");
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchZone(setZone, setZoneId);
        fetchParking(
            setParking,
            setPage,
            setAllPage,
            page.toString(),
            search,
            "createdAt",
            "desc"
        );
    }, [page]);

    const handleZoneChange = (e) => {
        setZoneId(e.target.value);
    };

    const handleNextPage = async () => {
        await fetchParking(
            setParking,
            setPage,
            setAllPage,
            (page + 1).toString()
        );
        setPage(page + 1);
    };

    const handlePrevPage = async () => {
        await fetchParking(
            setParking,
            setPage,
            setAllPage,
            (page - 1).toString()
        );
        setPage(page + 1);
    };

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        await fetchParking(
            setParking,
            setPage,
            setAllPage,
            page.toString(),
            e.target.value
        );
    };

    const checkAndCreate = async () => {
        setChecked(true);
        if (name && desc && amount && +zoneId) {
            await createParking(name, desc, +amount, +zoneId);
            setOpen(false);
        }
        setChecked(false);
    };

    const filterData: FilterButtonProps = {
        data: [
            {
                title: "ใหม่ - เก่า",
                func: async () =>
                    await fetchParking(
                        setParking,
                        setPage,
                        setAllPage,
                        page,
                        search,
                        "createdAt",
                        "desc"
                    ),
            },
            {
                title: "เก่า - ใหม่",
                func: async () =>
                    await fetchParking(
                        setParking,
                        setPage,
                        setAllPage,
                        page,
                        search,
                        "createdAt",
                        "asc"
                    ),
            },
            {
                title: "จำนวนมาก - น้อย",
                func: async () =>
                    await fetchParking(
                        setParking,
                        setPage,
                        setAllPage,
                        page,
                        search,
                        "amount",
                        "desc"
                    ),
            },
            {
                title: "จำนวนน้อย - มาก",
                func: async () =>
                    await fetchParking(
                        setParking,
                        setPage,
                        setAllPage,
                        page,
                        search,
                        "amount",
                        "asc"
                    ),
            },
        ],
    };

    const isInValid = useMemo(() => {
        return validateLength(name, 1, checked);
    }, [checked]);
    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">เพิ่มที่จอดรถ</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ชื่อ"
                                            key="name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            error={isInValid}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={name}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextInput
                                            label="คำอธิบาย"
                                            key="desc"
                                            onChange={(e) =>
                                                setDesc(e.target.value)
                                            }
                                            error={validateLength(
                                                desc,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={desc}
                                            isRequired
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            label="จำนวน"
                                            key="amount"
                                            type="number"
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            error={validateLength(
                                                desc,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={amount}
                                            isRequired
                                        />
                                    </div>
                                    <div>
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
                                    onPress={() => checkAndCreate()}
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
                    <h1 className="text-xl font-bold">ที่จอดรถ</h1>
                </div>
                <div className="flex justify-between my-4 align-middle">
                    <div className="w-10/12 flex align-middle">
                        <Input
                            className="w-8/12 md:w-4/12 h-10"
                            type="text"
                            placeholder="ค้นหา"
                            labelPlacement="outside"
                            startContent={
                                <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={handleSearch}
                        />
                        <div className="mt-2 ml-2">
                            <FilterButton data={filterData.data} />
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
                <ResponsiveParkingTable data={parking} />
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

export default Parking;
