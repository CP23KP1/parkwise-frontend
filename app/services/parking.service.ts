import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const editParking = async (
    id: number | string,
    name: string,
    description: string,
    amount: string,
    zoneId: number
) => {
    try {
        if (!isRequiredFieldValidated(name, zoneId, +amount)) {
            return;
        }
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            await axios.patch(
                process.env.NEXT_PUBLIC_API_HOST + "/parking/" + id,
                {
                    name: name,
                    description: description,
                    amount: parseInt(amount.toString()),
                    zoneId: zoneId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }
        Swal.fire({
            icon: "success",
            title: "แก้ไขเรียบร้อยแล้ว",
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

export const deleteParking = async (id: number) => {
    try {
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            axios
                .delete(
                    process.env.NEXT_PUBLIC_API_HOST +
                        "/parking/" +
                        id.toString(),
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "ทำการลบเสร็จสิ้น",
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

export const fetchParking = (
    setParking: any,
    setPage: any,
    setPageAll: any,
    page: string,
    search?: string,
    field?: string,
    order: string = "asc"
) => {
    if (page === undefined) {
        page = "1";
    }
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        axios
            .get(
                process.env.NEXT_PUBLIC_API_HOST +
                    `/parking?page=${page}&limit=10${
                        search ? `&search=${search}` : ""
                    }${field ? `&orderField=${field}` : ""}${
                        order ? `&orderDirection=${order}` : ""
                    }`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                const data = response.data.data;
                setPage(response.data.meta.page);
                setPageAll(response.data.meta.pageCount);
                setParking(data);
            });
    }
};

const isRequiredFieldValidated = (
    name: string,
    zoneId: number,
    amount: number
) => {
    if (name === "" || !zoneId || amount === 0) {
        return false;
    }
    return true;
};

export const createParking = async (
    name: string,
    description: string,
    amount: number,
    zoneId: number
) => {
    if (!isRequiredFieldValidated(name, zoneId, amount)) {
        return;
    }
    Swal.isLoading();
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        await axios
            .post(
                process.env.NEXT_PUBLIC_API_HOST + "/parking",
                {
                    name: name,
                    description: description,
                    amount: parseInt(amount.toString()),
                    zoneId: zoneId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "สร้างเรียบร้อยแล้ว",
                    timer: 2000,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "มีบางอย่างผิดพลาด",
                    text: "กรุณาลองใหม่อีกครั้ง",
                });
            });
    }
};
