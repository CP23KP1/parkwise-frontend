// ResponsiveTable.tsx
import React, { useCallback, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import { ZoneRowData } from "@/app/assets/data/zone";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import TextInput from "../input/input";
import { deleteZone, editZone } from "./function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import {
    Button,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { zoneColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

interface Props {
    data: ZoneRowData[];
}

const ResponsiveZoneTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [id, setId] = useState("");
    const [zoneName, setZoneName] = useState("");
    const [description, setDescription] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
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

    const validateAndEdit = () => {
        setChecked(true);
        if (zoneName && checked && maxCapacity && address) {
            editZone(
                id,
                zoneName,
                description,
                maxCapacity,
                address,
                selectedLatLng
            );
        }
    };

    const handleEdit = (data: any) => {
        setId(data.id);
        setZoneName(data.name);
        setDescription(data.description);
        setMaxCapacity(data.maximumCapacity);
        setAddress(data.address);
        setSelectedLatLng({
            lat: parseFloat(data.latitude) || 0,
            lng: parseFloat(data.longitude) || 0,
        });
        onOpenModal();
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "คุณต้องการที่จะลบหรือไม่?",
            showCancelButton: true,
            icon: "warning",
            iconColor: "#DC143C",
            confirmButtonText: `ใช่`,
            confirmButtonColor: "#DC143C",
            cancelButtonText: `ไม่`,
        }).then((data) => {
            if (data.isConfirmed) {
                deleteZone(id);
            }
        });
    };

    const handleEditZone = async () => {
        await editZone(
            id,
            zoneName,
            description,
            maxCapacity,
            address,
            selectedLatLng
        );
    };

    const [selectedLatLng, setSelectedLatLng] = useState({
        lat: 13.6512990907,
        lng: 100.493667011,
    });
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });

    const handleMapClick = (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log("Clicked Latitude:", lat);
        console.log("Clicked Longitude:", lng);
        setSelectedLatLng({ lat, lng });
    };

    const sortedItems = useMemo(() => {
        return [...data].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column!];
            const second = b[sortDescriptor.column!];
            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, data]);

    const renderCell = useCallback(
        (zone: ZoneRowData, columnKey: keyof ZoneRowData) => {
            const cellValue = zone[columnKey];

            switch (columnKey) {
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(zone)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(zone.id)}
                            >
                                <FaTrashCan />
                                ลบ
                            </Button>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <>
            <Modal open={open} onClose={onCloseModal}>
                <div className="mx-10 my-4">
                    <h2 className="font-bold text-xl">แก้ไขโซน</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ชื่อโซน</p>
                            <TextInput
                                value={zoneName}
                                onChange={(e) => setZoneName(e.target.value)}
                                error={validateLength(zoneName, 1, checked)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                            />
                        </div>
                        <div className="pt-4">
                            <p>คำอธิบาย</p>
                            <TextInput
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={validateLength(description, 1, checked)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                            />
                        </div>
                        <div>
                            <p>รองรับได้สูงสุด</p>
                            <TextInput
                                value={maxCapacity}
                                onChange={(e) => setMaxCapacity(e.target.value)}
                                error={validateLength(maxCapacity, 1, checked)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                            />
                        </div>
                        <div>
                            <p>ที่อยู่</p>
                            <TextInput
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                error={validateLength(address, 1, checked)}
                                errorMessage={CAN_NOT_BE_EMPTY}
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
                            {/* TODO */}
                            <button
                                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                                onClick={validateAndEdit}
                            >
                                แก้ไข
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>
            </Modal>
            <div className="table-container w-72 sm:w-full">
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={zoneColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === "actions"
                                        ? "center"
                                        : "start"
                                }
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={"ไม่มีข้อมูลอุปกรณ์"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof ZoneRowData
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default ResponsiveZoneTable;
