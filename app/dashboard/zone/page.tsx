"use client";
import { ZoneRowData } from "@/app/assets/data/zone";
import ResponsiveTable from "@/app/components/zone/zone-table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import FilterButton, {
} from "@/app/components/button/filter";
import { FilterMenuProps } from "@/app/components/button/filter-menu";
import axios from 'axios'
import TextInput from "@/app/components/input/input";

const Zone = () => {
  const data: ZoneRowData[] = [
    {
      id: 1,
      name: "ใต้อาคาร LX",
      address: "ตึก LX",
      maximum_capacity: 50,
      occupancy: 25,
      description: "อาคารภายใน KMUTT",
      avaliable: 25,
      lat: 13.6512990907,
      long: 100.493667011,
    },
    {
      id: 1,
      name: "FIBO",
      address: "ตึก FIBO",
      maximum_capacity: 50,
      occupancy: 25,
      description: "อาคารภายใน KMUTT",
      avaliable: 25,
      lat: 13.6512990907,
      long: 100.493667011,
    },
  ];
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
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
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div className="pt-4">
              <p>คำอธิบาย</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>จำนวนรถสูงสุดที่จอดได้</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>ที่อยู่</p>
              <input
                type="text"
                className="border-2 border-solid border-gray-600 w-80 h-10"
              />
            </div>
            <div>
              <p>Service</p>
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
        <ResponsiveTable data={data} />
        <div className="mt-8 flex align-middle gap-4">
          <button className="flex items-center space-x-2  border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
            <img src="/svg/back-button.svg" className="w-5 h-5" />
          </button>
          <div>
            <p className="text-center mt-2">1 / 14</p>
          </div>
          <button className="flex items-center space-x-2 border-solid border-2 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded">
            <img src="/svg/next-button.svg" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Zone;
