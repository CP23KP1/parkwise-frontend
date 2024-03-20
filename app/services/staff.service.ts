import { checkAuth } from "@/app/helper/auth";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";
import axios from "axios";
import Swal from "sweetalert2";
import { StaffRowData } from "../types/data/staff";

export const editStaff = async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    position: string,
    imageFile?: File
) => {
    if (checkAuth()) {
        Swal.isLoading();
        const url = process.env.NEXT_PUBLIC_API_HOST + "/staffs/" + id;
        let imageUrl;
        if (imageFile) {
            imageUrl = await uploadFileFirebase(imageFile!, `staffs/${id}`);
        }
        axios
            .patch(
                url,
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    phoneNumber: mobileNo,
                    position: "Other",
                    imageUrl: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                }
            )
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "ทำการแก้ไขเสร็จสิ้น",
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

export const deleteStaff = async (id: number) => {
    try {
        Swal.isLoading();
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            axios
                .delete(
                    process.env.NEXT_PUBLIC_API_HOST +
                        "/staffs/" +
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

export const fetchStaff = async (
    setStaff: any,
    setPage: any,
    setAllPage: any,
    page?: number,
    status?: string,
    search?: string
) => {
    if (page === undefined) {
        page = 1;
    }

    if (status === undefined) {
        status = "all";
    }

    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        await axios
            .get(
                process.env.NEXT_PUBLIC_API_HOST +
                    `/staffs?page=${page}&limit=10&status=${status}${
                        search ? `&search=${search}` : ""
                    }`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((data) => {
                setPage(data.data.meta.page);
                setAllPage(data.data.meta.pageCount);
                setStaff(data.data.data);
            });
    }
};

export const createStaff = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    position: string,
    imageFile?: File
) => {
    Swal.isLoading();
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");

        try {
            const { data } = await axios.post<StaffRowData>(
                process.env.NEXT_PUBLIC_API_HOST + "/staffs",
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    position: "Other",
                    phoneNumber: phoneNumber,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.id && imageFile) {
                const imageUrl = await uploadFileFirebase(
                    imageFile,
                    `staffs/${data.id}`
                );
                await axios.patch(
                    process.env.NEXT_PUBLIC_API_HOST + "/staffs/" + data.id,
                    { imageUrl: imageUrl },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            await Swal.fire({
                icon: "success",
                title: "ทำการสร้างเสร็จสิ้น",
            });
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "มีบางอย่างผิดพลาด",
                text: "กรุณาลองใหม่อีกครั้ง",
            });
        }
    }
};
