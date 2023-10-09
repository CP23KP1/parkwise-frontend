// ResponsiveTable.tsx
import React from "react";
import { Column, useTable } from "react-table";

interface Props {
  data: CarbonRowData[];
}

const ResponsiveCarbonTable: React.FC<Props> = ({ data }) => {
  const columns: Column<CarbonRowData>[] = React.useMemo(
    () => [
      {
        Header: "Carplate",
        accessor: "carPlate",
      },
      {
        Header: "From",
        accessor: "from",
      },
      {
        Header: "Destination",
        accessor: "destination",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleEdit = (id: number) => {
    // Implement your edit logic here
    alert(`Edit row with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    alert(`Delete row with ID: ${id}`);
  };

  return (
    <div className="table-container w-72 sm:w-full"  >
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

export default ResponsiveCarbonTable;
