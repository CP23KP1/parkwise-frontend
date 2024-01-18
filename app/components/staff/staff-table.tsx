// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteStaff, editStaff } from "./function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateEmail, validateEmailWording, validateLength, validatePhone, validatePhoneWording } from "@/app/helper/validate";

interface Props {
  data: StaffRowData[];
}

const ResponsiveStaffTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(0);
  const [checked, setChecked] = useState(false)

  const columns: Column<StaffRowData>[] = React.useMemo(
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
        Header: "เบอร์โทรศัพท์มือถือ",
        accessor: "phoneNumber",
      },
      {
        Header: "สถานะ",
        accessor: "service",
        Cell: ({ cell }) => {
          const service = cell.value;
          return (
            <div className={cell.value ? "text-green-400" : "text-red-500"}>
              {service ? "ใช้อยู่" : "ไม่ได้ใช้"}
            </div>
          );
        },
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

  const handleEdit = (data: StaffRowData) => {
    setId(data.id);
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setPhone(data.phoneNumber);
    setOpen(true);
  };

  const validateAndEdit = () => {
    setChecked(true)
    if(id && firstName && lastName && email && phone){
      editStaff(id, firstName, lastName, email, phone);
    }
  }

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
        deleteStaff(id);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">แก้ไขเจ้าหน้าที่</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(firstName, 1, checked)}
              />
            </div>
            <div className="pt-4">
              <p>นามสกุล</p>
              <TextInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(lastName, 1, checked)}
              />
            </div>
            <div>
              <p>อีเมล</p>
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validateEmail(email, checked)}
                errorMessage={validateEmailWording(email)}
              />
            </div>
            <div>
              <p>เบอร์มือถือ</p>
              <TextInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={validatePhone(phone, checked)}
                errorMessage={validatePhoneWording(phone)}
                
              />
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
