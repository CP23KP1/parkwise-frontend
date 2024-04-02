import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const createEmergencyNumber = async (
    name: string,
    phoneNumber: string,
    active: boolean
) => {
    if (!name || phoneNumber.length < 10 || phoneNumber.length > 10) {
        return;
    }
    try {
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            await axios.post(
                process.env.NEXT_PUBLIC_API_HOST + "/emergencies",
                {
                    name: name,
                    phoneNumber: phoneNumber,
                    active: active ?? true,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire({
                icon: "success",
                title: "สร้างเบอร์โทรฉุกเฉินเรียบร้อยแล้ว",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "มีบางอย่างผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้ง",
        });
    }
};

export const fetchEmergency = (setData: any) => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        axios
            .get(process.env.NEXT_PUBLIC_API_HOST + "/emergencies", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setData(res.data);
            });
    }
};

export const searchEmergency = (setData: any, search: string) => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        axios
            .get(
                process.env.NEXT_PUBLIC_API_HOST +
                    "/emergencies?search=" +
                    search,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setData(res.data);
            });
    }
};

export const editEmergency = async (
    id: number,
    name: string,
    phoneNumber: string,
    active: boolean
) => {
    if (!name || phoneNumber.length < 10 || phoneNumber.length > 10) {
        return;
    }
    try {
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            axios
                .put(
                    process.env.NEXT_PUBLIC_API_HOST + "/emergencies/" + id,
                    {
                        name: name,
                        phoneNumber: phoneNumber,
                        active: active ?? true,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "แก้ไขเรียบร้อยแล้ว",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "มีบางอย่างผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้ง",
        });
    }
};

export const deleteEmergency = async (id: string) => {
    try {
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            axios.delete(
                process.env.NEXT_PUBLIC_API_HOST + "/emergencies/" + id,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        }
        Swal.fire({
            icon: "success",
            title: "ลบเรียบร้อยแล้ว",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "มีบางอย่างผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้ง",
        });
    }
};
