// ResponsiveTable.tsx
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { Column, useTable } from "react-table";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { deleteParking, editParking } from "./function";
import { ZoneRowData } from "@/app/assets/data/zone";
import { fetchZone } from "@/app/dashboard/device/function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import { Select } from "../select/select";

interface Props {
  data: ParkingRowData[];
}

const ResponsiveParkingTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [zone, setZone] = useState<ZoneRowData[]>([]);
  const [zoneId, setZoneId] = useState("");
  const [checked, setChecked] = useState(false);

  const validateAndEdit = () => {
    setChecked(true);
    if (name && checked && amount) {
      editParking(id, name, description, amount, parseInt(zoneId));
    }
  };

  useEffect(() => {
    fetchZone(setZone);
  }, []);

  const handleZoneChange = (e: any) => {
    setZoneId(e);
  };

  const columns: Column<ParkingRowData>[] = React.useMemo(
    () => [
      {
        Header: "ชื่อ",
        accessor: "name",
      },
      {
        Header: "คำอธิบาย",
        accessor: "description",
      },
      {
        Header: "จำนวน",
        accessor: "amount",
      },
      {
        Header: "โซน",
        accessor: "zone",
        Cell: ({ row }) => {
          console.log("row jaa", row);
          return <p>{row.original.zone.name}</p>;
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

  const handleEdit = (data: ParkingRowData) => {
    console.log("data", data);
    setId(data.id.toString());
    setName(data.name);
    setDescription(data.description);
    setAmount(data.amount.toString());
    setZoneId(data.zoneId);
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
        deleteParking(id);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">แก้ไขที่จอดรถ</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(name, 1, checked)}
              />
            </div>
            <div>
              <p>คำอธิบาย</p>
              <TextInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(description, 1, checked)}
              />
            </div>
            <div>
              <p>จำนวน</p>
              <TextInput
                type="number"
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(amount, 1, checked)}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <p>โซน</p>
              <div>
                <Select
                  onChange={handleZoneChange}
                  key="id"
                  valueShow="name"
                  data={zone}
                  value={zoneId}
                />
              </div>
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

export default ResponsiveParkingTable;
