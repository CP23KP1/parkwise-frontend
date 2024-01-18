// EditableTable.tsx
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import TextInput from "../input/input";

interface EditableTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  onEdit: (data: T) => void;
  onDelete: (id: number) => void;
  editTitle: string;
}

const EditableTable = <T extends object>({
  data,
  columns,
  onEdit,
  onDelete,
  editTitle,
}: EditableTableProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<T | null>(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleEdit = (rowData: T) => {
    setSelectedData(rowData);
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
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="mx-10 my-4">
          <h2 className="font-bold text-xl">{editTitle}</h2>
          <div className="flex flex-col gap-6">
            {selectedData &&
              columns.map((column) => (
                <div key={String(column.accessor)} className="pt-4">
                <p>{column.Header as React.ReactNode}</p>
                  <TextInput
                    value={String(selectedData && selectedData[column.accessor as keyof T]) as string | undefined}
                    onChange={(e) => {
                      if (selectedData) {
                        onEdit({
                          ...selectedData,
                          [String(column.accessor)]: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              ))}
            <div className="flex justify-start">
              <button
                className="btn bg-sky-400 py-2 px-4 rounded-md text-white"
                onClick={() => onCloseModal()}
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
                  <th>Actions</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                    <td>
                      <div className="flex gap-5">
                        <button
                          onClick={() => handleEdit(row.original)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          แก้ไข
                        </button>
                        <button
                        // @ts-ignore
                        onClick={() => handleDelete(row.original.id as any)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
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

export default EditableTable;
