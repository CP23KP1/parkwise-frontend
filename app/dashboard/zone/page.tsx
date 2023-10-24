"use client";
import { ZoneRowData } from "@/app/assets/data/zone";
import ResponsiveTable from "@/app/components/table";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const Zone = () => {
  const data: ZoneRowData[] = [
    { id: 1, name: "ใต้อาคาร LX", avaliable: 30, service: 12 },
    { id: 2, name: "ตึก FIBO", avaliable: 25, service: 9 },
  ];
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: "44", lng: "44" }), []);
  const [selected, setSelected] = useState(null);

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
            <div>
              <p>Avaliable</p>
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
              />
            </div>
            {isLoaded ? (
              <>
                <div className="places-container">
                  {/* <PlacesAutoComplete setSelected={setSelected}/> */}
                </div>
                <GoogleMap
                  zoom={16}
                  center={{ lat: 13.6512990907, lng: 100.493667011 }}
                  mapContainerStyle={{ width: "350px", height: "350px" }}
                  
                >
                  <Marker position={{ lat: 13.6512990907, lng: 100.493667011 }}></Marker>
                  </GoogleMap>
              </>
            ) : (
              <></>
            )}
            <div className="flex justify-start">
              <button className="btn bg-sky-400 py-2 px-4 rounded-md text-white">
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
        <div className="flex justify-end">
          <button
            className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
            onClick={onOpenModal}
          >
            เพิ่ม
          </button>
        </div>
        <ResponsiveTable data={data} />
      </div>
    </>
  );
};


interface PlacesAutoCompleteProps {
  setSelected: (location: { lat: number, lng: number }) => void;
}

const PlacesAutoComplete: React.FC<PlacesAutoCompleteProps> = ({ setSelected }) => {
  const handleSelect = async (address: string) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  }
  
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map((place, index) => (
              <ComboboxOption key={index} value={place.description} />
            ))
          }
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Zone;
