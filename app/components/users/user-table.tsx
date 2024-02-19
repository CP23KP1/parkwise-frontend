// ResponsiveTable.tsx
import React, { useCallback, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { UserRowData } from "@/app/types/data/user";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteAdmin, editAdmin } from "./function";
import { validateEmail, validateLength } from "@/app/helper/validate";
import { CAN_NOT_BE_EMPTY, EMAIL_INVALID } from "@/app/helper/wording";
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
import { userColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

interface Props {
    data: UserRowData[];
}

const ResponsiveUserTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setChecked(false);
        setOpen(false);
    };

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const [loading, setLoading] = useState(false);

    const handleEdit = (data: any) => {
        setId(data.id);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        onOpenModal();
    };

    const validateAndEdit = () => {
        setChecked(true);
        if (firstName !== "" && lastName !== "" && email !== "") {
            editAdmin(parseInt(id), firstName, lastName, email, password);
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
                deleteAdmin(id);
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
        (user: UserRowData, columnKey: keyof UserRowData) => {
            const cellValue = user[columnKey];

            switch (columnKey) {
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(user)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(user.id)}
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
                                <span className="text-xl">
                                    แก้ไขผู้ดูแลระบบ
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-1">
                                        <TextInput
                                            label="ชื่อจริง"
                                            key="firstname"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            error={validateLength(
                                                firstName,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={firstName}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <TextInput
                                            label="นามสกุล"
                                            key="lastname"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            error={validateLength(
                                                lastName,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={lastName}
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
                                    บันทึก
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
                    <TableHeader columns={userColumns}>
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
                        emptyContent={"ไม่มีข้อมูลผู้ดูแลระบบ"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof UserRowData
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

export default ResponsiveUserTable;
