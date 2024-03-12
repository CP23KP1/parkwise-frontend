// ResponsiveTable.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Column, useTable } from "react-table";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import { ZoneRowData } from "@/app/types/data/zone";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import TextInput from "../input/input";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import {
    Avatar,
    Button,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import { zoneColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import {
    displayImageUrl,
    displayImageUrlWithSelectedImage,
} from "@/app/helper/display-image";
import { deleteZone, editZone } from "@/app/services/zone.service";

interface Props {
    data: ZoneRowData[];
}

const ResponsiveZoneTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setId("");
        setZoneName("");
        setDescription("");
        setMaxCapacity("");
        setAddress("");
        setChecked(false);
        setOpen(false);
    };

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
    const [loading, setLoading] = useState(false);

    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

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

    const validateAndEdit = async () => {
        setChecked(true);
        setLoading(true);
        if (zoneName && maxCapacity && address) {
            await editZone(
                id,
                zoneName,
                description,
                maxCapacity,
                address,
                selectedLatLng,
                selectedImageFile!
            );
        }
        setChecked(false);
        setLoading(false);
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
        setSelectedImage(data.imageUrl);
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

    const renderCell: any = useCallback(
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
            <Modal isOpen={open} onClose={onCloseModal} size="4xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">แก้ไขโซน</span>
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
                                                        setZoneName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={validateLength(
                                                        zoneName,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={zoneName}
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
                                                    error={validateLength(
                                                        description,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={description}
                                                    isRequired
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
                                                    error={validateLength(
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
                                                    error={validateLength(
                                                        maxCapacity,
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
                                                    error={validateLength(
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
                                                    error={validateLength(
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
                                    onPress={() => validateAndEdit()}
                                    isLoading={loading}
                                >
                                    แก้ไข
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
                {/* <div className="mx-10 my-4">
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
                </div> */}
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
                                        {renderCell(item, columnKey as any)}
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
