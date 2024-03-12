// ResponsiveTable.tsx
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { CarRowData } from "@/app/types/data/car";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import TextInput from "../input/input";
import { StaffRowData } from "@/app/types/data/staff";
import {
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import { carColumns } from "@/app/utils/constants";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { validateLength } from "@/app/helper/validate";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { displayImageUrlWithSelectedImage } from "@/app/helper/display-image";
import { provinces } from "@/app/common/data/province.data";
import { deleteCar, editCar, fetchStaff } from "@/app/services/car.service";

interface Props {
    data: CarRowData[];
}

const ResponsiveCarTable: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        setChecked(false);
        setSelectedImage(null);
    };

    const [carId, setCarId] = useState(0);
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [province, setProvince] = useState("");

    const [staffs, setStaffs] = useState<StaffRowData[]>([]);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

    useEffect(() => {
        fetchStaff(setStaffs);
    }, []);

    const validateAndEdit = async () => {
        try {
            setLoading(true);
            setChecked(true);
            if (licensePlate && color && brand && model && year && ownerId) {
                await editCar(
                    carId,
                    licensePlate,
                    color,
                    brand,
                    model,
                    +year,
                    ownerId,
                    province,
                    selectedImageFile!
                );
                setChecked(false);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const sortedItems = useMemo(() => {
        return [...data].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column!];
            const second = b[sortDescriptor.column!];
            const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, data]);

    const handleEdit = (data: any) => {
        setCarId(data.id);
        setLicensePlate(data.licensePlate);
        setColor(data.color);
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setOwnerId(data.staffId);
        setSelectedImage(data.image);
        setProvince(data.province);
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
                deleteCar(id);
            }
        });
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
        if (file) {
            const reader = new FileReader() as any;
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderCell = useCallback(
        (car: CarRowData, columnKey: keyof CarRowData) => {
            const cellValue = car[columnKey];

            switch (columnKey) {
                case "staff":
                    return `${car.staff.firstname} ${car.staff.lastname}`;
                case "actions":
                    return (
                        <div className="relative flex flew-row justify-end items-center gap-2">
                            <Button
                                variant="shadow"
                                color="warning"
                                className="text-white"
                                onClick={() => handleEdit(car)}
                            >
                                <FaPencil /> แก้ไข
                            </Button>
                            <Button
                                variant="shadow"
                                color="danger"
                                onClick={() => handleDelete(car.id)}
                            >
                                <FaTrashCan />
                                ลบ
                            </Button>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    const getStaffAutoCompleteLabel = useCallback(
        (ownerId: string) => {
            const staff = staffs.find((item) => item.id === parseInt(ownerId));
            return staff ? `${staff.firstname} ${staff.lastname}` : "";
        },
        [staffs]
    );

    const getPronvinceAutoCompleteLabel = useCallback(
        (province: string) => {
            const provinceData = provinces.find(
                (item) => item.name_en === province
            );
            return provinceData ? provinceData.name_th : "";
        },
        [provinces]
    );

    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">แก้ไขรถยนต์</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div className="col-span-1">
                                        <div className="h-full flex flex-row justify-center items-center p-2">
                                            <input
                                                className="hidden"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={inputRef}
                                                placeholder="Upload Image"
                                            />

                                            <Tooltip
                                                color="primary"
                                                content="Edit Car Image"
                                                className="capitalize text-white"
                                            >
                                                {isUploadImageLoading ? (
                                                    <CircularProgress
                                                        color="primary"
                                                        aria-label="Loading..."
                                                    />
                                                ) : (
                                                    <Avatar
                                                        className="hover:cursor-pointer w-32 h-32"
                                                        isBordered
                                                        color="primary"
                                                        src={displayImageUrlWithSelectedImage(
                                                            selectedImage!
                                                        )}
                                                        onClick={() => {
                                                            inputRef.current.click();
                                                        }}
                                                    ></Avatar>
                                                )}
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                            <div className="col-span-2">
                                                <Autocomplete
                                                    size="sm"
                                                    items={staffs}
                                                    label="เจ้าของรถ"
                                                    placeholder="เลือกเจ้าของรถ"
                                                    className="max-w-xs"
                                                    selectedKey={ownerId}
                                                    onSelectionChange={
                                                        setOwnerId as any
                                                    }
                                                    inputValue={getStaffAutoCompleteLabel(
                                                        ownerId
                                                    )}
                                                    isClearable={false}
                                                >
                                                    {(item) => (
                                                        <AutocompleteItem
                                                            key={item.id}
                                                        >
                                                            {`${item.firstname} ${item.lastname}`}
                                                        </AutocompleteItem>
                                                    )}
                                                </Autocomplete>
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ป้ายทะเบียน"
                                                    key="licensePlate"
                                                    onChange={(e) => {
                                                        setLicensePlate(
                                                            e.target.value
                                                        );
                                                    }}
                                                    error={validateLength(
                                                        licensePlate,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={licensePlate}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Autocomplete
                                                    size="sm"
                                                    items={provinces}
                                                    label="จังหวัดจดทะเบียน"
                                                    className="max-w-xs"
                                                    selectedKey={province}
                                                    onSelectionChange={
                                                        setProvince as any
                                                    }
                                                    inputValue={getPronvinceAutoCompleteLabel(
                                                        province
                                                    )}
                                                    isClearable={false}
                                                >
                                                    {(item) => (
                                                        <AutocompleteItem
                                                            key={item.name_en}
                                                        >
                                                            {item.name_th}
                                                        </AutocompleteItem>
                                                    )}
                                                </Autocomplete>
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="สี"
                                                    key="color"
                                                    onChange={(e) =>
                                                        setColor(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        color,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={color}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="แบรนด์"
                                                    key="brand"
                                                    onChange={(e) =>
                                                        setBrand(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        brand,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={brand}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="รุ่น"
                                                    key="model"
                                                    onChange={(e) =>
                                                        setModel(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        model,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={model}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ปีที่ผลิต"
                                                    key="year"
                                                    type="number"
                                                    onChange={(e) =>
                                                        setYear(e.target.value)
                                                    }
                                                    error={validateLength(
                                                        year.toString(),
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={year}
                                                    isRequired
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    ปิด
                                </Button>
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    onPress={() => validateAndEdit()}
                                    isLoading={loading}
                                >
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="table-container w-72 sm:w-full">
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={carColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === "actions"
                                        ? "center"
                                        : "start"
                                }
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={"ไม่มีข้อมูลรถยนต์"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(
                                            item,
                                            columnKey as keyof CarRowData
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default ResponsiveCarTable;
