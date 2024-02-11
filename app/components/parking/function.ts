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
