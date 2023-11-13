// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { DeviceRowData } from "@/app/assets/data/devices";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from 'sweetalert2'

interface Props {
  data: DeviceRowData[];
}

const ResponsiveDeviceTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const columns: Column<DeviceRowData>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Zone",
        accessor: "zone",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <div className="flex gap-5">
              <button
                onClick={() => handleEdit(row.original)}
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

  const handleEdit = (data: DeviceRowData) => {
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price.toString());
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
        console.log("confirm jaaa");
      }
    });
  };

  return (
    <div className="table-container w-72 sm:w-full">
      <Modal open={open} onClose={onCloseModal} center>
      <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Edit Device</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={name}
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={description}
              />
            </div>
            <div>
              <p>Price</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={price}
              />
            </div>
            <div>
              <p>Zone</p>
              <select
                className="border-2 border-solid border-gray-600 w-80 h-10"
              >
                <option>ใต้ตึก LX</option>
                <option>ตึก FIBO</option>
              </select>
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                Edit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
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

export default ResponsiveDeviceTable;
