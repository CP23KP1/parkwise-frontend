"use client"
import React, { useState, FC, useEffect } from "react";

interface SelectProps {
  onChange?: (value: any) => void;
  data?: any[];
  valueShow?: string;
  value: number | string;
}

export const Select: FC<SelectProps> = ({
  onChange,
  data,
  valueShow,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    if (value && data && valueShow) {
      const selectedItem = data.find((item) => item.id === value);
      setSelectedValue(selectedItem ? selectedItem[valueShow] : "บางอย่างผิดพลาด");
    }
  }, [value, data, valueShow]);

  const handleOptionClick = (selectedItem: any) => {
    setOpen(false);
    onChange && onChange(selectedItem.id);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="cursor-pointer inline-flex justify-between w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 transition"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <span className="truncate">{selectedValue}</span>
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 13l6-6H4l6 6z"
              />
            </svg>
          </button>
        </span>
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {data &&
              valueShow &&
              data.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  onClick={() => handleOptionClick(item)}
                  role="menuitem"
                >
                  {item[valueShow]}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
