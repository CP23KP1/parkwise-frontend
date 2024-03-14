// ResponsiveTable.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import {
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
    Button,
    SortDescriptor,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { activeChoice, emergencyColumns } from "@/app/utils/constants";
import { EmergencyRowData } from "@/app/types/data/emergency";
import {
    deleteEmergency,
    editEmergency,
} from "@/app/services/emergency.service";

interface Props {
    data: EmergencyRowData[];
}

const ResponsiveEmergencyTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setId(0);
        setPosition("");
        setChecked(false);
        setOpen(false);
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState(0);
    const [position, setPosition] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [active, setActive] = useState(false);

    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "createdAt",
        direction: "descending",
    });
    const [loading, setLoading] = useState(false);

    const handleEdit = (data: any) => {
        console.log("data", data);
        onOpenModal();
        setId(data.id);
        setName(data.name);
        setPhoneNumber(data.phoneNumber);
        setActive(data.active);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setPosition(data.position);
    };

    const validateAndEdit = async () => {
        setChecked(true);
        setLoading(true);
        try {
            if (id && name && phoneNumber && active != null) {
                await editEmergency(id, name, phoneNumber, active);
                setChecked(false);
            }
        } catch (error) {
        } finally {
            setLoading(false);
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
                deleteEmergency(String(id));
            }
        });
    };

    const handleActiveChange = (value: string) => {
        if (value == "1") {
            // mean true
            setActive(true);
        } else {
            setActive(false);
        }
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
        (emergency: EmergencyRowData, columnKey: keyof EmergencyRowData) => {
            const cellValue = emergency[columnKey];

            switch (columnKey) {
                case "active":
                    return emergency.active ? (
                        <p className="text-green-600">แสดงผล</p>
                    ) : (
                        <p className="text-red-600">ไม่แสดงผล</p>
                    );
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(emergency)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(emergency.id)}
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
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    แก้ไขเบอร์โทรฉุกเฉิน
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="gap-6">
                                    <div>
                                        <TextInput
                                            label="ชื่อเบอร์โทรฉุกเฉิน"
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
                                    <div className="mt-4">
                                        <TextInput
                                            label="เบอร์โทรศัพท์"
                                            key="phoneNumber"
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            error={validatePhone(
                                                phoneNumber,
                                                checked
                                            )}
                                            errorMessage={validatePhoneWording(
                                                phoneNumber
                                            )}
                                            value={phoneNumber}
                                            isRequired
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Select
                                            label="แสดงผล"
                                            isRequired
                                            key="active.name"
                                            onChange={(e) =>
                                                handleActiveChange(
                                                    e.target.value
                                                )
                                            }
                                            value={String(active)}
                                            defaultSelectedKeys={[
                                                active ? "1" : "2",
                                            ]}
                                        >
                                            {activeChoice.map((active) => (
                                                <SelectItem
                                                    key={active.id}
                                                    value={active.id}
                                                >
                                                    {active.name}
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
                    <TableHeader columns={emergencyColumns}>
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
                                            item as any,
                                            columnKey as keyof EmergencyRowData
                                        ) || null}
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

export default ResponsiveEmergencyTable;
