// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { StaffRowData } from "@/app/assets/data/staff";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";

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
        Header: "ชื่อ",
        accessor: "firstName",
      },
      {
        Header: "นามสกุล",
        accessor: "lastName",
      },
      {
        Header: "ตำแหน่ง",
        accessor: "position",
      },
      {
        Header: "อีเมล",
        accessor: "email",
      },
      {
        Header: "เบอร์โทรศัพท์",
        accessor: "phone",
      },
      {
        Header: "เป็นเจ้าของรถ",
        accessor: "carOwn",
        Cell: ({ cell }) => {
          const carOwnArray = cell.value;
          const carOwnString = carOwnArray.join(", ");
          return <div>{carOwnString}</div>;
        },
      },
      {
        Header: "บริการ",
        accessor: "service",
        Cell: ({ cell }) => {
          const service = cell.value;
          return <div className={cell.value ? 'text-green-400' : 'text-red-500'}>{service ? "Active" : "Inactive"}</div>;
        }
      },
      {
        Header: "การดำเนินการ",
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
              <p>ชื่อ</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={firstName}
              />
            </div>
            <div className="pt-4">
              <p>นามสกุล</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={lastName}
              />
            </div>
            <div>
              <p>ตำแหน่ง</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={position}
              />
            </div>
            <div>
              <p>อีเมล</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={email}
              />
            </div>
            <div>
              <p>เบอร์โทรศัพท์</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={phone}
              />
            </div>{" "}
            <div>
              <p>
                เป็นเจ้าของรถ <br />
                <p className="text-sm">
                  (Example Input: กข-2343 กทม, ขค-2145 ชลบุรี)
                </p>
              </p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={carOwn.join(", ")}
              />
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
