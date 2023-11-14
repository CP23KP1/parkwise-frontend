// ResponsiveTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { UserRowData } from "@/app/assets/data/user";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import { ZoneRowData } from "@/app/assets/data/zone";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import TextInput from "../input/input";
import { deleteZone, editZone } from "./function";

interface Props {
  data: ZoneRowData[];
}

const ResponsiveZoneTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [id, setId] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [description, setDescription] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleLatChange = (event: any) => {
    setSelectedLatLng({
      ...selectedLatLng,
      lat: parseFloat(event.target.value) || 0,
    });
  };

  const handleLngChange = (event: any) => {
    setSelectedLatLng({
      ...selectedLatLng,
      lng: parseFloat(event.target.value) || 0,
    });
  };

  const columns: Column<ZoneRowData>[] = React.useMemo(
    () => [
      {
        Header: "Zone Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Max Capacity",
        accessor: "maximum_capacity",
      },
      {
        Header: "Occupancy",
        accessor: "occupancy",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Latitude",
        accessor: "lat",
      },
      {
        Header: "Longitude",
        accessor: "long",
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
    setId(data.id);
    setZoneName(data.name);
    setDescription(data.description);
    setMaxCapacity(data.maximum_capacity);
    setAddress(data.address);
    setSelectedLatLng({
      lat: parseFloat(data.lat) || 0,
      lng: parseFloat(data.long) || 0,
    });
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
        deleteZone(id)
      }
    });
  };

  const handleEditZone = async () => {
    await editZone(
      id,
      zoneName,
      description,
      maxCapacity,
      address,
      selectedLatLng
    );
  };

  const [selectedLatLng, setSelectedLatLng] = useState({
    lat: 13.6512990907,
    lng: 100.493667011,
  });
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
              <p>Name</p>
              <TextInput
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <p>Description</p>
              <TextInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <p>Max Capacity</p>
              <TextInput
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
              />
            </div>
            <div>
              <p>Address</p>
              <TextInput
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <p>Latitude</p>
              <TextInput
                value={selectedLatLng.lat}
                onChange={(e) => handleLatChange(e.target.value)}
              />
            </div>
            <div>
              <p>Longtitude</p>
              <TextInput
                value={selectedLatLng.lng}
                onChange={(e) => handleLngChange(e.target.value)}
              />
            </div>
            {isLoaded ? (
              <>
                <div className="places-container"></div>
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
              {/* TODO */}
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={handleEditZone}
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

export default ResponsiveZoneTable;
