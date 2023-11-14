// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { UserRowData } from "@/app/assets/data/user";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import { ZoneRowData } from "@/app/assets/data/zone";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface Props {
  data: ZoneRowData[];
}

const ResponsiveZoneTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [zoneName, setZoneName] = useState("");
  const [description, setDescription] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const columns: Column<ZoneRowData>[] = React.useMemo(
    () => [
      {
        Header: "ชื่อโซน",
        accessor: "name",
      },
      {
        Header: "คำอธิบาย",
        accessor: "description",
      },
      {
        Header: "จำนวนรถที่รองรับได้",
        accessor: "maximum_capacity",
      },
      {
        Header: "ใช้งานอยู่",
        accessor:'occupancy',
      },
      {
        Header: "ที่อยู่",
        accessor: "address",
      },
      {
        Header: "ละติจูด",
        accessor: "lat",
      },
      {
        Header: "ลองติจูด",
        accessor: "long",
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

  const handleEdit = (data: any) => {
    console.log(data);
    setZoneName(data.name);
    setDescription(data.description);
    setMaxCapacity(data.maximum_capacity);
    setAddress(data.address);
    setLat(data.lat);
    setLong(data.long);
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
          console.log("confirm jaaa");
        }
      });
  };

  const [selectedLatLng, setSelectedLatLng] = useState({ lat: 13.6512990907, lng: 100.493667011 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const handleMapClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log("Clicked Latitude:", lat);
    console.log("Clicked Longitude:", lng);
    setSelectedLatLng({ lat, lng });
  };

  return (
    <>
      {" "}
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Zone</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Zone Name</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={zoneName}
              />
            </div>
            <div className="pt-4">
              <p>คำอธิบาย</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={description}
              />
            </div>
            <div className="pt-4">
              <p>Max Capacity</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={maxCapacity}
              />
            </div>
            <div>
              <p>ที่อยู่</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={address}
              />
            </div>
            <div>
              <p>ละติจูด</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={selectedLatLng.lat}
              />
            </div>
            <div>
              <p>ลองติจูด</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
                value={selectedLatLng.lng}
              />
            </div>
            {isLoaded ? (
              <>
                <div className="places-container">
                </div>
                <GoogleMap
                  zoom={16}
                  center={selectedLatLng}
                  mapContainerStyle={{ width: "350px", height: "350px" }}
                  onClick={handleMapClick}
                >
                  <Marker
                    position={selectedLatLng}
                    onLoad={(marker) => {
                      const position = marker.getPosition();
                      if (position) {
                        const lat = position.lat();
                        const lng = position.lng();
                        console.log("Selected Latitude:", lat);
                        console.log("Selected Longitude:", lng);
                        setSelectedLatLng((prevState) => ({
                          ...prevState,
                          lat,
                          lng,
                        }));
                      }
                    }}
                  />
                </GoogleMap>
              </>
            ) : (
              <></>
            )}
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
                เพิ่ม
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

export default ResponsiveZoneTable;
