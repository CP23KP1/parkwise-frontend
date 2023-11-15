// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { CarRowData } from "@/app/assets/data/car";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { createCar } from "@/app/dashboard/car/function";
import { deleteCar, editCar } from "./function";

interface Props {
  data: CarRowData[];
}

const ResponsiveCarTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [carId, setCarId] = useState(0);
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const columns: Column<CarRowData>[] = React.useMemo(
    () => [
      {
        Header: "License Plate",
        accessor: "licensePlate",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Owner",
        accessor: "staffId",
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

  const handleEdit = (data: any) => {
    setCarId(data.id);
    setLicensePlate(data.licensePlate);
    setColor(data.color);
    setBrand(data.brand);
    setModel(data.model);
    setYear(data.year);
    setOwnerId(data.staffId);
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
        deleteCar(id);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Car</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>License Plate</p>
              <TextInput
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Color</p>
              <TextInput
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Brand</p>
              <TextInput
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Model</p>
              <TextInput
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Year</p>
              <TextInput
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <p>Owner</p>
              <TextInput
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
              />
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  editCar(
                    carId,
                    licensePlate,
                    color,
                    brand,
                    model,
                    parseInt(year),
                    ownerId
                  )
                }
              >
                Create
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
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
    </>
  );
};

export default ResponsiveCarTable;
