// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { UserRowData } from "@/app/assets/data/user";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteAdmin, editAdmin } from "./function";

interface Props {
  data: UserRowData[];
}

const ResponsiveUserTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const columns: Column<UserRowData>[] = React.useMemo(
    () => [
      {
        Header: "ชื่อ",
        accessor: "firstname",
      },
      {
        Header: "นามสกุล",
        accessor: "lastname",
      },
      {
        Header: "อีเมล",
        accessor: "email",
      },
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row }) => {
          return (
            <div className="flex gap-5">
              <button
                onClick={() => handleEdit(row.original)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(row.original.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                ลบ
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
    setId(data.id);
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    onOpenModal();
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
        deleteAdmin(id);
      }
    });
  };

  return (
    <>
      {" "}
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Edit Staff</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>นามสกุล</p>
              <TextInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <p>อีเมล</p>
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>รหัสผ่าน</p>
              <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  editAdmin(parseInt(id), firstName, lastName, email, password)
                }
              >
                แก้ไข
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

export default ResponsiveUserTable;
