// ResponsiveTable.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { DeviceRowData } from "@/app/assets/data/devices";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { ZoneRowData } from "@/app/assets/data/zone";
import {
    deleteDevice,
    editDevice,
    fetchZone,
} from "@/app/dashboard/device/function";
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
import { deviceColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

interface Props {
    data: DeviceRowData[];
}

const ResponsiveDeviceTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [deviceId, setDeviceId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [zoneId, setZoneId] = useState(0);
    const [zone, setZone] = useState<ZoneRowData[]>([]);
    const [checked, setChecked] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    useEffect(() => {
        fetchZone(setZone);
    }, []);

    const handleZoneChange = (event: any) => {
        const selectedZoneId = parseInt(event, 10);
        setZoneId(selectedZoneId);
    };

    const validateAndEdit = () => {
        setChecked(true);
        if (name && checked && price && brand) {
            editDevice(
                deviceId.toString(),
                name,
                description,
                price,
                brand,
                zoneId.toString()
            );
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
            <Modal open={open} onClose={onCloseModal} center>
                <div className="mx-10 my-4">
                    <h2 className="font-bold text-xl">แก้ไขอุปกรณ์</h2>
                    <div className="flex flex-col gap-6">
                        <div className="pt-4">
                            <p>ชื่อ</p>
                            <TextInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={validateLength(name, 1, checked)}
                                errorMessage={CAN_NOT_BE_EMPTY}
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
                            <p>ราคา</p>
                            <TextInput
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(price, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>แบรนด์</p>
                            <TextInput
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                errorMessage={CAN_NOT_BE_EMPTY}
                                error={validateLength(brand, 1, checked)}
                            />
                        </div>
                        <div>
                            <p>โซน</p>
                            <Select
                                valueShow="name"
                                key="id"
                                onChange={handleZoneChange}
                                value={zoneId}
                                data={zone}
                            />
                            {/* <select
                className="border-2 border-solid border-gray-600 w-80 h-10"
                onChange={handleZoneChange}
              >
                {zone.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select> */}
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

            {/* <div
        className="table-wrapper"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table {...getTableProps()} className="responsive-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
        </div>
    );
};

export default ResponsiveDeviceTable;
