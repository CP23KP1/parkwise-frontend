// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";

interface Props {
  data: StaffRowData[];
}

const ResponsiveStaffTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carOwn, setCarOwn] = useState<string[]>([]);
  const columns: Column<StaffRowData>[] = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile No",
        accessor: "phone",
      },
      {
        Header: "Car Own",
        accessor: "carOwn",
        Cell: ({ cell }) => {
          const carOwnArray = cell.value;
          const carOwnString = carOwnArray.join(", ");
          return <div>{carOwnString}</div>;
        },
      },
      {
        Header: "Service",
        accessor: "service",
        Cell: ({ cell }) => {
          const service = cell.value;
          return (
            <div className={cell.value ? "text-green-400" : "text-red-500"}>
              {service ? "Active" : "Inactive"}
            </div>
          );
        },
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

  const handleEdit = (data: StaffRowData) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPosition(data.position);
    setEmail(data.email);
    setPhone(data.phone);
    setCarOwn(data.carOwn);
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
        console.log("confirm jaaa");
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Staff</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>First Name</p>
              <TextInput value={firstName} />
            </div>
            <div className="pt-4">
              <p>Last Name</p>
              <TextInput value={lastName} />
            </div>
            <div>
              <p>Position</p>
              <TextInput value={position} />
            </div>
            <div>
              <p>Email</p>
              <TextInput value={email} />
            </div>
            <div>
              <p>Mobile No</p>
              <TextInput value={phone} />
            </div>
            <div>
              <p>
                Car Own <br />
                <p className="text-sm">
                  (Example Input: กข-2343 กทม, ขค-2145 ชลบุรี)
                </p>
              </p>
              <TextInput value={carOwn.join(", ")} />
            </div>
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                Add
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

export default ResponsiveStaffTable;
