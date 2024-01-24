// ResponsiveTable.tsx
import React, { useCallback, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteStaff, editStaff } from "./function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import {
    validateEmail,
    validateEmailWording,
    validateLength,
    validatePhone,
    validatePhoneWording,
} from "@/app/helper/validate";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Dropdown,
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SortDescriptor,
    user,
} from "@nextui-org/react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { staffColumns } from "@/app/utils/constants";

interface Props {
    data: StaffRowData[];
}

const ResponsiveStaffTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState(0);
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    const handleEdit = (data: StaffRowData) => {
        setId(data.id);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setOpen(true);
    };

    const validateAndEdit = () => {
        setChecked(true);
        if (id && firstName && lastName && email && phone) {
            editStaff(id, firstName, lastName, email, phone);
        }
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
                deleteStaff(id);
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
        (staff: StaffRowData, columnKey: keyof StaffRowData) => {
            const cellValue = staff[columnKey];

            switch (columnKey) {
                case "status":
                    return (
                        <span
                            className={
                                staff.status ? "text-green-500" : "text-red-500"
                            }
                        >
                            {staff.status ? "ใช้งาน" : "ไม่ใช้งาน"}
                        </span>
                    );
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(staff)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(staff.id)}
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
                    <h2 className="font-bold text-xl">แก้ไขเจ้าหน้าที่</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ชื่อ</p>
                            <TextInput
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(firstName, 1, checked)}
                            />
                        </div>
                        <div className="pt-4">
                            <p>นามสกุล</p>
                            <TextInput
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(lastName, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>อีเมล</p>
                            <TextInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={validateEmail(email, checked)}
                                errorMessage={validateEmailWording(email)}
                            />
                        </div>
                        <div>
                            <p>เบอร์มือถือ</p>
                            <TextInput
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={validatePhone(phone, checked)}
                                errorMessage={validatePhoneWording(phone)}
                            />
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
                    <TableHeader columns={staffColumns}>
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
                        emptyContent={"ไม่มีข้อมูลผู้ใช้"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof StaffRowData
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

export default ResponsiveStaffTable;
