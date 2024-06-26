"use client";
import FilterButton from "@/app/common/components/button/filter";
import { FilterMenuProps } from "@/app/common/components/button/filter-menu";
import TextInput from "@/app/common/components/input/input";
import ResponsiveStaffTable from "@/app/common/components/staff/staff-table";
import { STAFF_PAGE } from "@/app/common/data/meta.data";
import {
    inValidateEmail,
    inValidateLength,
    inValidatePhone,
} from "@/app/helper/validate";
import { CAN_NOT_BE_EMPTY, PHONE_LENGTH_INVALID } from "@/app/helper/wording";
import { createStaff, fetchStaff } from "@/app/services/staff.service";
import { StaffRowData } from "@/app/types/data/staff";
import {
    Avatar,
    Button,
    CircularProgress,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Tooltip,
} from "@nextui-org/react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "react-responsive-modal/styles.css";

const StaffPage = () => {
    const pathname = usePathname();

    const [staff, setStaff] = useState<StaffRowData[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [page, setPage] = useState(1);
    const [allPage, setAllPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(
        null
    );
    const inputRef = useRef(null as any);

    useEffect(() => {
        fetchStaff(setStaff, setPage, setAllPage, page, "all", undefined);
    }, [page]);

    const handleSelectActive = async () => {
        await fetchStaff(setStaff, setPage, setAllPage, page, "active", search);
        setStatus("active");
    };

    const handleSelectInactive = async () => {
        await fetchStaff(
            setStaff,
            setPage,
            setAllPage,
            page,
            "inactive",
            search
        );
        setStatus("inactive");
    };

    const filterData: FilterMenuProps[] = [
        {
            title: "ทั้งหมด",
            func: async () =>
                await fetchStaff(
                    setStaff,
                    setPage,
                    setAllPage,
                    page,
                    status,
                    search
                ),
        },
        {
            title: "เฉพาะที่ใช้งาน",
            func: async () => await handleSelectActive(),
        },
        {
            title: "เฉพาะที่ไม่ได้ใช้งาน",
            func: async () => await handleSelectInactive(),
        },
    ];

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setChecked(false);
        setLoading(false);
        resetForm();
        setOpen(false);
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setPosition("");
        setSelectedImage(null);
        setSelectedImageFile(null);
    };

    const handleCreateStaff = async () => {
        setChecked(true);
        setLoading(true);

        const isFirstnameInValidated = inValidateLength(firstName, 1, checked);
        const isLastnameInValidated = inValidateLength(lastName, 1, checked);
        const isEmailInValidated = inValidateEmail(email, checked);
        const isPhoneInValidated = inValidatePhone(phone, checked);

        try {
            if (
                !isFirstnameInValidated &&
                !isLastnameInValidated &&
                !isEmailInValidated &&
                !isPhoneInValidated
            ) {
                await createStaff(
                    firstName,
                    lastName,
                    email,
                    phone,
                    position,
                    selectedImageFile!
                );
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: any) => {
        setSearch(e.target.value);
        await fetchStaff(
            setStaff,
            setPage,
            setAllPage,
            page,
            status,
            e.target.value
        );
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

    return (
        <>
            <Head>
                <title>{STAFF_PAGE.title}</title>
                <meta name="description" content={STAFF_PAGE.description} />
            </Head>
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    เพิ่มเจ้าหน้าที่
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid gap-3">
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="ชื่อจริง"
                                                    key="firstname"
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={inValidateLength(
                                                        firstName,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={firstName}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <TextInput
                                                    label="นามสกุล"
                                                    key="lastname"
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={inValidateLength(
                                                        lastName,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={lastName}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="อีเมล"
                                                    key="email"
                                                    type="email"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    error={inValidateEmail(
                                                        email,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={email}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="เบอร์โทรศัพท์"
                                                    key="phone"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    error={inValidatePhone(
                                                        phone,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        PHONE_LENGTH_INVALID
                                                    }
                                                    value={phone}
                                                    isRequired
                                                />
                                            </div>
                                            {/* <div className="col-span-2">
                                                <TextInput
                                                    label="ตำแหน่ง"
                                                    key="position"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setPosition(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={checked}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={phone}
                                                    isRequired
                                                />
                                            </div> */}
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
                                    onPress={() => handleCreateStaff()}
                                    isLoading={loading}
                                >
                                    เพิ่ม
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="w-72 sm:w-full">
                <div>
                    <h1 className="text-xl font-bold">เจ้าหน้าที่</h1>
                </div>
                <div className="flex justify-between my-4 align-middle">
                    <div className="w-10/12 flex align-middle">
                        <Input
                            className="w-8/12 md:w-4/12 h-10"
                            variant="bordered"
                            type="email"
                            placeholder="ค้นหา"
                            labelPlacement="outside"
                            startContent={
                                <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={handleSearch}
                        />
                        <div className="mt-2 ml-2">
                            <FilterButton data={filterData as never} />
                        </div>
                    </div>
                    <Button
                        color="primary"
                        onClick={onOpenModal}
                        variant="shadow"
                    >
                        เพิ่ม
                    </Button>
                </div>
                <ResponsiveStaffTable data={staff} />
                <div className="mt-8 flex justify-end align-middle gap-4">
                    <Pagination
                        isCompact
                        showControls
                        total={allPage}
                        initialPage={page}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </>
    );
};

export default StaffPage;
