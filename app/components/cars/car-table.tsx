// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { CarRowData } from "@/app/assets/data/car";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { createCar, fetchStaff } from "@/app/dashboard/car/function";
import { deleteCar, editCar } from "./function";
import { StaffRowData } from "@/app/assets/data/staff";
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
import { carColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

interface Props {
    data: CarRowData[];
}

const ResponsiveCarTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [carId, setCarId] = useState(0);
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [staff, setStaff] = useState<StaffRowData[]>([]);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    useEffect(() => {
        fetchStaff(setStaff);
    }, []);

    const handleStaffChange = (event: any) => {
        const selectedStaffId = parseInt(event, 10);
        setOwnerId(selectedStaffId.toString());
    };

    const handleEdit = (data: any) => {
        setCarId(data.id);
        setLicensePlate(data.licensePlate);
        setColor(data.color);
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setOwnerId(data.staffId);
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
                deleteCar(id);
            }
        });
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
        (car: CarRowData, columnKey: keyof CarRowData) => {
            const cellValue = car[columnKey];

            switch (columnKey) {
                case "staff":
                    return `${car.staff.firstname} ${car.staff.lastname}`;
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(car)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(car.id)}
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
                    <h2 className="font-bold text-xl">แก้ไขรถยนต์</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ป้ายทะเบียน</p>
                            <TextInput
                                value={licensePlate}
                                onChange={(e) =>
                                    setLicensePlate(e.target.value)
                                }
                            />
                        </div>
                        <div className="pt-4">
                            <p>สี</p>
                            <TextInput
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        <div className="pt-4">
                            <p>แบรนด์</p>
                            <TextInput
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="pt-4">
                            <p>รุ่น</p>
                            <TextInput
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>
                        <div className="pt-4">
                            <p>ปี</p>
                            <TextInput
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>เจ้าของ</p>
                            <Select
                                valueShow={["firstname", "lastname"]}
                                key="id"
                                onChange={handleStaffChange}
                                data={staff}
                                value={ownerId}
                            />
                        </div>
                        <div className="flex justify-start">
                            <button
                                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                                onClick={() =>
                                    editCar(
                                        carId,
                                        licensePlate,
                                        color,
                                        brand,
                                        model,
                                        parseInt(year),
                                        ownerId
                                    )
                                }
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
                    <TableHeader columns={carColumns}>
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
                        emptyContent={"ไม่มีข้อมูลรถยนต์"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof CarRowData
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

export default ResponsiveCarTable;
