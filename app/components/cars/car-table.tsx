// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { CarRowData } from "@/app/types/data/car";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { createCar, fetchStaff } from "@/app/dashboard/car/function";
import { deleteCar, editCar } from "./function";
import { StaffRowData } from "@/app/types/data/staff";
import { Select } from "../select/select";
import {
    Button,
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
} from "@nextui-org/react";
import { carColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { validateLength } from "@/app/helper/validate";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";

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
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        fetchStaff(setStaff);
    }, []);

    const validateAndEdit = () => {
        try {
            setLoading(true);
            setChecked(true);
            if (licensePlate && color && brand && model && year && ownerId) {
                editCar(
                    carId,
                    licensePlate,
                    color,
                    brand,
                    model,
                    +year,
                    ownerId
                );
                setChecked(false);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

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
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">แก้ไขรถยนต์</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ป้ายทะเบียน"
                                            key="licensePlate"
                                            onChange={(e) => {
                                                setLicensePlate(e.target.value);
                                            }}
                                            error={validateLength(
                                                licensePlate,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
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
                                            errorMessage={CAN_NOT_BE_EMPTY}
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
                                            errorMessage={CAN_NOT_BE_EMPTY}
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
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={model}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ปีที่ผลิต"
                                            key="year"
                                            type="number"
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                            error={checked}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={year}
                                            isRequired
                                        />
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
                                    เพิ่ม
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
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
