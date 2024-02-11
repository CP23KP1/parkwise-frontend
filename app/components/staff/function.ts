import { checkAuth } from "@/app/helper/auth";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";
import axios from "axios";
import Swal from "sweetalert2";

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
                    position: position,
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
