// ResponsiveTable.tsx
import React from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import { LogsRowData } from "@/app/assets/data/logs";

interface Props {
  data: LogsRowData[];
}

const ResponsiveLogsTable: React.FC<Props> = ({ data }) => {
  const columns: Column<LogsRowData>[] = React.useMemo(
    () => [
      {
        Header: "ป้ายทะเบียนรถ",
        accessor: "carPlate",
      },
      {
        Header: "รายละเอียด",
        accessor: "details",
      },
      {
        Header: "เจ้าของ",
        accessor: "owner",
      },
      {
        Header: "ตำแหน่ง",
        accessor: "position",
      },
      {
        Header: "วันเวลา",
        accessor: "datetime",
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
