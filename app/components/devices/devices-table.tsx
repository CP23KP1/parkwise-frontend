// ResponsiveTable.tsx
import React, { useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { DeviceRowData } from "@/app/assets/data/devices";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { ZoneRowData } from "@/app/assets/data/zone";
import {
  deleteDevice,
  editDevice,
  fetchZone,
} from "@/app/dashboard/device/function";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import { Select } from "../select/select";

interface Props {
  data: DeviceRowData[];
}

const ResponsiveDeviceTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [deviceId, setDeviceId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [zoneId, setZoneId] = useState(0);
  const [zone, setZone] = useState<ZoneRowData[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchZone(setZone);
  }, []);

  const handleZoneChange = (event: any) => {
    const selectedZoneId = parseInt(event, 10);
    setZoneId(selectedZoneId);
  };

  const validateAndEdit = () => {
    setChecked(true);
    if (name && checked && price && brand) {
      editDevice(
        deviceId.toString(),
        name,
        description,
        price,
        brand,
        zoneId.toString()
      );
    }
  } 

  const columns: Column<DeviceRowData>[] = React.useMemo(
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
        Header: "ราคา",
        accessor: "price",
      },
      {
        Header: "แบรนด์",
        accessor: "brand",
      },
      {
        Header: "โซน",
        accessor: "zone",
        Cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2">{row.original.zone.name}</div>
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

  const handleEdit = (data: DeviceRowData) => {
    setDeviceId(data.id);
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price.toString());
    setBrand(data.brand.toString());
    setZoneId(data.zoneId as number);
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
        deleteDevice(id);
      }
    });
  };

  return (
    <div className="table-container w-72 sm:w-full">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">แก้ไขอุปกรณ์</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>ชื่อ</p>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={validateLength(name, 1, checked)}
                errorMessage={CAN_NOT_BE_EMPTY}
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
              <p>ราคา</p>
              <TextInput
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(price, 1, checked)}
              />
            </div>
            <div>
              <p>แบรนด์</p>
              <TextInput
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                errorMessage={CAN_NOT_BE_EMPTY}
                error={validateLength(brand, 1, checked)}
              />
            </div>
            <div>
              <p>โซน</p>
              <Select valueShow="name" key='id' onChange={handleZoneChange} value={zoneId} data={zone}/>
              {/* <select
                className="border-2 border-solid border-gray-600 w-80 h-10"
                onChange={handleZoneChange}
              >
                {zone.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() =>
                  validateAndEdit()
                }
              >
                แก้ไข
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
