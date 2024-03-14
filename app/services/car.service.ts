import { checkAuth } from "@/app/helper/auth";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";
import axios from "axios";
import Swal from "sweetalert2";
import { CarRowData } from "../types/data/car";

export const editCar = async (
    carId: number,
    licensePlate: string,
    color: string,
    brand: string,
    model: string,
    year: number,
    staffId: string,
    province: string,
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
                    province: province,
                    imageUrl: imageUrl,
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

export const createCar = async (
    licensePlate: string,
    color: string,
    brand: string,
    model: string,
    year: string,
    ownerId: string,
    province: string,
    imageFile?: File
) => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            const { data } = await axios.post<CarRowData>(
                process.env.NEXT_PUBLIC_API_HOST + "/cars",
                {
                    licensePlate: licensePlate,
                    color: color,
                    brand: brand,
                    model: model,
                    year: parseInt(year),
                    province: province,
                    staffId: parseInt(ownerId),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (data.id && imageFile) {
                const imageUrl = await uploadFileFirebase(
                    imageFile,
                    `cars/${data.id}`
                );
                await axios.patch(
                    process.env.NEXT_PUBLIC_API_HOST + "/cars/" + data.id,
                    { imageUrl: imageUrl },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            Swal.fire({
                icon: "success",
                title: "ทำการสร้างรถเรียบร้อยแล้ว",
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

export const fetchCar = async (
    setCar: any,
    setPage: any,
    setAllPage: any,
    page?: string,
    search?: string,
    field?: string,
    order?: string
) => {
    let url = process.env.NEXT_PUBLIC_API_HOST + "/cars";
    if (page) {
        url += `?page=${page}`;
    }
    if (search) {
        url += `&search=${search}`;
    }
    if (field) {
        url += `&orderBy=${field}`;
    }
    if (order) {
        url += `&orderDirection=${order}`;
    }
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        await axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCar(res.data.data);
                setPage(res.data.meta.page);
                setAllPage(res.data.meta.pageCount);
            });
    }
};

export const fetchStaff = (setStaff: any) => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        axios
            .get(
                process.env.NEXT_PUBLIC_API_HOST + "/staffs?page=1&limit=1000",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setStaff(res.data.data);
            });
    }
};
