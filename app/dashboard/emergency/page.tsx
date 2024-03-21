"use client";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { ZoneRowData } from "@/app/types/data/zone";
import ResponsiveEmergencyTable from "@/app/components/emergency/emergency-table";
import { EmergencyRowData } from "@/app/types/data/emergency";
import TextInput from "@/app/components/input/input";
import { CAN_NOT_BE_EMPTY } from "@/app/helper/wording";
import { validateLength } from "@/app/helper/validate";
import {
    createEmergencyNumber,
    fetchEmergency,
    searchEmergency,
} from "@/app/services/emergency.service";
import { activeChoice } from "@/app/utils/constants";

const Emergency = () => {
    const [data, setData] = useState<EmergencyRowData[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [active, setActive] = useState(true);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        fetchEmergency(setData);
    }, []);

    useEffect(() => {
        if (search) {
            searchEmergency(setData, search);
        } else {
            fetchEmergency(setData);
        }
    }, [search]);

    const handleActiveChange = (value: string) => {
        if (value == "1") {
            // mean true
            setActive(true);
        } else {
            setActive(false);
        }
    };

    const validateAndCreate = async () => {
        setChecked(true);
        try {
            const isNameValidated = validateLength(name, 1, checked);
            const isPhoneNumberValidated = validateLength(
                phoneNumber,
                1,
                checked
            );

            if (isNameValidated && isPhoneNumberValidated && active != null) {
                await createEmergencyNumber(name, phoneNumber, active);
            }
            setChecked(false);
        } catch (error) {
        } finally {
        }
    };

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal isOpen={open} onClose={onCloseModal} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-xl">
                                    เพิ่มเบอร์โทรฉุกเฉิน
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="ชื่อเบอร์โทรฉุกเฉิน"
                                                    key="name"
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    error={validateLength(
                                                        name,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={name}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <TextInput
                                                    label="เบอร์โทรศัพท์"
                                                    key="color"
                                                    onChange={(e) =>
                                                        setPhoneNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    error={validateLength(
                                                        phoneNumber,
                                                        1,
                                                        checked
                                                    )}
                                                    errorMessage={
                                                        CAN_NOT_BE_EMPTY
                                                    }
                                                    value={phoneNumber}
                                                    isRequired
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Select
                                                    label="แสดงผล"
                                                    isRequired
                                                    key="zone"
                                                    onChange={(e) =>
                                                        handleActiveChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={String(active)}
                                                >
                                                    {activeChoice.map(
                                                        (active) => (
                                                            <SelectItem
                                                                key={active.id}
                                                                value={
                                                                    active.id
                                                                }
                                                            >
                                                                {active.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </Select>
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
                                    onPress={() => validateAndCreate()}
                                >
                                    เพิ่ม
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="w-full pl-10 md:pl-0">
                <div>
                    <h1 className="text-xl font-bold">เบอร์โทรฉุกเฉิน</h1>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between my-4 align-middle">
                        <div className="w-10/12 flex align-middle">
                            <Input
                                className="w-8/12 md:w-4/12 h-10"
                                variant="bordered"
                                type="text"
                                placeholder="ค้นหา"
                                labelPlacement="outside"
                                startContent={
                                    <IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            color="primary"
                            onClick={onOpenModal}
                            variant="shadow"
                        >
                            เพิ่ม
                        </Button>
                    </div>
                    <ResponsiveEmergencyTable data={data as any[]} />
                </div>
            </div>
        </>
    );
};

export default Emergency;
