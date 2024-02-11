// ResponsiveTable.tsx
import React, { useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/types/data/staff";
import { LogsRowData } from "@/app/types/data/logs";
import {
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { logColumns } from "@/app/utils/constants";

interface Props {
    data: LogsRowData[] | any[];
}

const ResponsiveLogsTable: React.FC<Props> = ({ data }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    if (!Array.isArray(data)) {
        console.error("Invalid data type. Expected an array.");
        return null; // or handle it appropriately
    }

    const sortedItems = useMemo(() => {
        return [...data].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column!];
            const second = b[sortDescriptor.column!];
            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, data]);

    const renderCell = (item: LogsRowData, columnKey: keyof LogsRowData) => {
        console.log(item);

        const cellValue = item[columnKey];

        switch (columnKey) {
            case "car":
                return <>{item.car.licensePlate}</>;
            case "staff":
                return (
                    <>
                        {item.staff.firstname} {item.staff.lastname}
                    </>
                );
            case "arrowDirection":
                return (
                    <>
                        {item.arrowDirection === "in" ? (
                            <p className="text-green-500">เข้า</p>
                        ) : (
                            <p className="text-red-500">ออก</p>
                        )}
                    </>
                );
            default:
                return cellValue;
        }
    };

    return (
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
                <TableHeader columns={logColumns}>
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
                    emptyContent={"ไม่มีข้อมูลรถยนต์"}
                    items={sortedItems}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(
                                        item,
                                        columnKey as keyof LogsRowData
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

export default ResponsiveLogsTable;
