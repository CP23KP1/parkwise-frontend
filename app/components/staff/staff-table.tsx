// ResponsiveTable.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/types/data/staff";
import "react-responsive-modal/styles.css";
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
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Avatar,
    CircularProgress,
} from "@nextui-org/react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { staffColumns } from "@/app/utils/constants";
import {
    displayImageUrl,
    displayImageUrlWithSelectedImage,
} from "@/app/helper/display-image";

interface Props {
    data: StaffRowData[];
}

const ResponsiveStaffTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setId(0);
        setPosition("");
        setSelectedImage(null);
        setSelectedImageFile(null);
        setChecked(false);
        setOpen(false);
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState(0);
    const [position, setPosition] = useState("");

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

    const handleEdit = (data: StaffRowData) => {
        setId(data.id);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setPosition(data.position);
        setSelectedImage(data.imageUrl);
        setOpen(true);
    };

    const validateAndEdit = async () => {
        setChecked(true);
        setLoading(true);
        try {
            if (id && firstName && lastName && email && phone && position) {
                await editStaff(
                    id,
                    firstName,
                    lastName,
                    email,
                    phone,
                    position,
                    selectedImageFile!
                );
            }
            setChecked(false);
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
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    แก้ไขเจ้าหน้าที่
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-1">
                                        <div className="h-full flex flex-row justify-center items-center p-2">
                                            <input
                                                className="hidden"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={inputRef}
                                                placeholder="Upload Image"
                                            />

                                            <Tooltip
                                                color="primary"
                                                content="Edit Car Image"
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
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="ชื่อจริง"
                                                    key="firstname"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        firstName,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={firstName}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="นามสกุล"
                                                    key="lastname"
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={validateLength(
                                                        lastName,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={lastName}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="อีเมลล์"
                                                    key="email"
                                                    type="email"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    error={validateEmail(
                                                        email,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={email}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="เบอร์โทรศัพท์"
                                                    key="phone"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    error={validatePhone(
                                                        phone,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={phone}
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
