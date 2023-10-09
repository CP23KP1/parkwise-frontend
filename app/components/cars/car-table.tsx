// ResponsiveTable.tsx
import React from "react";
import { Column, useTable } from "react-table";
import { CarRowData } from "@/app/assets/data/car";

interface Props {
  data: CarRowData[];
}

const ResponsiveCarTable: React.FC<Props> = ({ data }) => {
  const columns: Column<CarRowData>[] = React.useMemo(
    () => [
      {
        Header: "Carplate",
        accessor: "carPlate",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Owner",
        accessor: "owner",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <div className="flex gap-5">
              <button
                onClick={() => handleEdit(row.original.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.original.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          );
        },
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

export default ResponsiveCarTable;
