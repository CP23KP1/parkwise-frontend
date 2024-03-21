// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeviceRowData } from "@/app/types/data/devices";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { ZoneRowData } from "@/app/types/data/zone";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import {
    Select,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    SelectItem,
    ModalFooter,
} from "@nextui-org/react";
import { deviceColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import {
    deleteDevice,
    editDevice,
    fetchZone,
} from "@/app/services/device.service";

interface Props {
    data: DeviceRowData[];
}

const ResponsiveDeviceTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const [deviceId, setDeviceId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [zoneId, setZoneId] = useState(0);
    const [zones, setZone] = useState<ZoneRowData[]>([]);
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const [loading, setLoading] = useState(false);

    const onCloseModal = () => {
        setOpen(false);
        setChecked(false);
        setLoading(false);
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setZoneId(0);
    };

    useEffect(() => {
        fetchZone(setZone);
    }, []);

    const handleZoneChange = (event: any) => {
        const selectedZoneId = parseInt(event, 10);
        setZoneId(selectedZoneId);
    };

    const validateAndEdit = () => {
        setChecked(true);
        console.log(checked);

        if (name && price && brand) {
            editDevice(
                deviceId.toString(),
                name,
                description,
                price,
                brand,
                zoneId.toString()
            );
        }
        setChecked(false);
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
        (device: DeviceRowData, columnKey: keyof DeviceRowData) => {
            const cellValue = device[columnKey];

            switch (columnKey) {
                case "zone":
                    return device.zone.name;
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(device)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(device.id)}
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

    const handleEdit = (data: DeviceRowData) => {
        setDeviceId(data.id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price.toString());
        setBrand(data.brand.toString());
        setZoneId(data.zoneId as number);
        onOpenModal();
        // alert(`Edit row with ID: ${id}`);
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
                deleteDevice(id);
            }
        });
    };

    return (
        <div className="table-container w-72 sm:w-full">
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">แก้ไขอุปกรณ์</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ชื่อ"
                                            key="name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                            type="brand"
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
                                            defaultSelectedKeys={[
                                                zoneId ? zoneId.toString() : "",
                                            ]}
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
                                    onPress={() => validateAndEdit()}
                                    isLoading={loading}
                                >
                                    แก้ไข
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                classNames={{
                    wrapper: "max-h-full",
                }}
                sortDescriptor={sortDescriptor}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={deviceColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
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
                                        columnKey as keyof DeviceRowData
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ResponsiveDeviceTable;
