// ResponsiveTable.tsx
import React from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import { LogsRowData } from "@/app/assets/data/logs";

interface Props {
  data: LogsRowData[] | any[];
}

const ResponsiveLogsTable: React.FC<Props> = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("Invalid data type. Expected an array.");
    return null; // or handle it appropriately
  }
  const columns: Column<LogsRowData>[] = React.useMemo(
    () => [
      {
        Header: "License Plate",
        accessor: "car",
        Cell: ({ row }) => {
          return (
            <div className="flex">
              <div>{row.original.car?.licensePlate}</div>
            </div>
          );
        },
      },
      {
        Header: "Owner",
        accessor: "staff",
        Cell: ({ row }) => {
          return (
            <div className="flex">
              <div>{row.original.staff?.firstname} {row.original.staff?.lastname}</div>
            </div>
          );
        },
      },
    ],
    []
  );
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table-container w-72 sm:w-full">
      <div
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
      </div>
    </div>
  );
};

export default ResponsiveLogsTable;
