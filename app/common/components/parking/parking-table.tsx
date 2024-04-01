// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { ZoneRowData } from "@/app/types/data/zone";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { inValidateLength, inValidateMinNumber } from "@/app/helper/validate";
import {
    Select,
    Modal,
    Button,
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
    SelectItem,
    Pagination,
} from "@nextui-org/react";
import { parkingColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { deleteParking, editParking } from "@/app/services/parking.service";
import { fetchZone } from "@/app/services/device.service";

interface Props {
    data: ParkingRowData[];
}

const ResponsiveParkingTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);

    const onCloseModal = () => {
        setOpen(false);
        setId("");
        setName("");
        setDescription("");
        setAmount("");
        setZoneId("");
        setChecked(false);
        setLoading(false);
    };

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [zones, setZone] = useState<ZoneRowData[]>([]);
    const [zoneId, setZoneId] = useState("");
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const [loading, setLoading] = useState(false);

    const validateAndEdit = async () => {
        setChecked(true);
        setLoading(true);
        const isNameInValidated = inValidateLength(name, 1, checked);
        const isAmountInValidated = inValidateMinNumber(+amount, 1, checked);

        if (!isNameInValidated && !isAmountInValidated) {
            editParking(id, name, description, amount, parseInt(zoneId));
        }
        setLoading(false);
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
            <Modal isOpen={open} onClose={onCloseModal} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">แก้ไขที่จอดรถ</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <TextInput
                                            label="ชื่อ"
                                            key="name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            error={inValidateLength(
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
                                            key="desc"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            error={inValidateLength(
                                                description,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={description}
                                            isRequired
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            label="จำนวน"
                                            key="amount"
                                            type="number"
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            error={inValidateLength(
                                                amount,
                                                1,
                                                checked
                                            )}
                                            errorMessage={CAN_NOT_BE_EMPTY}
                                            value={amount}
                                            isRequired
                                        />
                                    </div>
                                    <div>
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
                        wrapper: "max-h-full",
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
                        emptyContent={"ไม่มีข้อมูลที่จอดรถ"}
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
