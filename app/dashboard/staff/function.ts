import { checkAuth } from "@/app/helper/auth";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";
import { StaffRowData } from "@/app/types/data/staff";
import axios from "axios";
import Swal from "sweetalert2";

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
