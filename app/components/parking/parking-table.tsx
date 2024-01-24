// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-responsive-modal";
import { Column, useTable } from "react-table";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteParking, editParking } from "./function";
import { ZoneRowData } from "@/app/assets/data/zone";
import { fetchZone } from "@/app/dashboard/device/function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import { Select } from "../select/select";
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
import { parkingColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

interface Props {
    data: ParkingRowData[];
}

const ResponsiveParkingTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [zone, setZone] = useState<ZoneRowData[]>([]);
    const [zoneId, setZoneId] = useState("");
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    const validateAndEdit = () => {
        setChecked(true);
        if (name && checked && amount) {
            editParking(id, name, description, amount, parseInt(zoneId));
        }
    };

    useEffect(() => {
        fetchZone(setZone);
    }, []);

    const handleZoneChange = (e: any) => {
        setZoneId(e);
    };

    const sortedItems = useMemo(() => {
        return [...data].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column!];
            const second = b[sortDescriptor.column!];
            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, data]);

    const handleEdit = (data: ParkingRowData) => {
        setId(data.id.toString());
        setName(data.name);
        setDescription(data.description);
        setAmount(data.amount.toString());
        setZoneId(data.zoneId);
        setOpen(true);
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
                deleteParking(id);
            }
        });
    };

    const renderCell = useCallback(
        (parking: ParkingRowData, columnKey: keyof ParkingRowData) => {
            const cellValue = parking[columnKey];

            switch (columnKey) {
                case "zone":
                    return parking.zone.name;
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(parking)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(parking.id)}
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
                    <h2 className="font-bold text-xl">แก้ไขที่จอดรถ</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ชื่อ</p>
                            <TextInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(name, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>คำอธิบาย</p>
                            <TextInput
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(description, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>จำนวน</p>
                            <TextInput
                                type="number"
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(amount, 1, checked)}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>โซน</p>
                            <div>
                                <Select
                                    onChange={handleZoneChange}
                                    key="id"
                                    valueShow="name"
                                    data={zone}
                                    value={zoneId}
                                />
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <button
                                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                                onClick={() => validateAndEdit()}
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
                    <TableHeader columns={parkingColumns}>
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
                        emptyContent={"ไม่มีข้อมูล Staff"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof ParkingRowData
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

export default ResponsiveParkingTable;
