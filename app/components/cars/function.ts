import { checkAuth } from "@/app/helper/auth";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";
import axios from "axios";
import Swal from "sweetalert2";

export const editCar = async (
    carId: number,
    licensePlate: string,
    color: string,
    brand: string,
    model: string,
    year: number,
    staffId: string,
    imageFile?: File
) => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            let imageUrl;
            if (imageFile) {
                imageUrl = await uploadFileFirebase(
                    imageFile!,
                    `cars/${carId}`
                );
            }
            await axios.patch(
                process.env.NEXT_PUBLIC_API_HOST + "/cars/" + carId,
                {
                    licensePlate: licensePlate,
                    color: color,
                    brand: brand,
                    model: model,
                    year: year,
                    staffId: parseInt(staffId),
                    imageUrl: imageFile,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire({
                icon: "success",
                title: "ทำการแก้ไขรถเรียบร้อยแล้ว",
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

export const deleteCar = async (id: number) => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            axios
                .delete(
                    process.env.NEXT_PUBLIC_API_HOST + "/cars/" + id.toString(),
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "ทำการลบรถเรียบร้อยแล้ว",
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
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "มีบางอย่างผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้ง",
        });
    }
};
