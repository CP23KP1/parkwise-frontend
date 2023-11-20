"use client";
import { ZoneRowData } from "@/app/assets/data/zone";
import ResponsiveTable from "@/app/components/zone/zone-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import FilterButton from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import axios from "axios";
import TextInput from "@/app/components/input/input";
import { checkAuth } from "@/app/helper/auth";
import { createZone, fetchZone } from "../function";
import { error } from "console";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { getPublicBasePath } from "@/app/helper/basePath";

const Zone = () => {
  const [dataShow, setDataShow] = useState<ZoneRowData[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [address, setAddress] = useState("");
  const [createStatus, setCreateStatus] = useState(false);
  const [page, setPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const pathname = usePathname();

  const getPage = () => {
    var parts = pathname.split("/");
    var page = parts[parts.length - 1];
    return page;
  };

  const handleNextPage = () => {
    setPage(parseInt(getPage()));
    window.location.href = `/dashboard/zone/${page + 1}`;
  };

  const handlePrevPage = () => {
    if (parseInt(getPage()) != 1) {
      setPage(parseInt(getPage()));
      window.location.href = `/dashboard/zone/${page - 1}`;
    }
  };

  useEffect(() => {
    getPage();
    fetchZone(setDataShow, setPage, setAllPage, getPage());
  }, []);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [selectedLatLng, setSelectedLatLng] = useState({
    lat: 13.6512990907,
    lng: 100.493667011,
  });

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

  const handleCreateZone = async () => {
    await createZone(
      name,
      description,
      maxCapacity,
      address,
      selectedLatLng,
      createStatus,
      setCreateStatus
    );
  };
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

  const filterData: FilterMenuProps[] = [
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
    {
      title: "ทั้งหมด",
      func: () => console.log("ทั้งหมด"),
    },
  ];

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">Create Zone</h2>
          <div className="flex flex-col gap-6">
            <div className="pt-4">
              <p>Name</p>
              <TextInput onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="pt-4">
              <p>Description</p>
              <TextInput onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <p>Max Capacity</p>
              <TextInput
                type="number"
                onChange={(e) => setMaxCapacity(e.target.value)}
              />
            </div>
            <div>
              <p>Address</p>
              <TextInput onChange={(e) => setAddress(e.target.value)} />
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
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={handleCreateZone}
              >
                Add
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
      <div className="w-72 sm:w-full">
        <div>
          <h1 className="text-xl font-bold">Zone</h1>
        </div>
        <div className="flex justify-between my-4 align-middle">
          <div className="w-10/12 flex align-middle">
            <input
              type="text"
              className="border-2 border-solid border-gray-600 w-8/12 md:w-4/12 h-10 pl-3"
              placeholder="ค้นหา"
            />
            <div className="mt-2 ml-2">
              <FilterButton data={filterData as never} />
            </div>
          </div>
          <button
            className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
            onClick={onOpenModal}
          >
            เพิ่ม
          </button>
        </div>
        <ResponsiveTable data={dataShow} />
        <div className="mt-8 flex align-middle gap-4">
          <button
            className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={page == 1}
          >
            <img src={getPublicBasePath('/svg/back-button.svg')} className="w-5 h-5" />
          </button>
          <div>
            <p className="text-center mt-2">
              {page} / {allPage}
            </p>
          </div>
          <button
            className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={page == allPage}
          >
            <img src={getPublicBasePath('/svg/next-button.svg')} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Zone;
