import { ZoneRowData } from "@/app/types/data/zone";
import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadFileFirebase } from "@/app/services/upload-file-firebase.service";

export const fetchZone = (
    setDataShow: any,
    setPage: any,
    setAllPage: any,
    page?: string,
    search?: string,
    field?: string,
    order?: string
) => {
    let url = process.env.NEXT_PUBLIC_API_HOST + "/zones";
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
        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
                const data = response.data.data as ZoneRowData[];
                setPage(response.data.meta.page);
                setAllPage(response.data.meta.pageCount);
                setDataShow(data);
            })
            .catch((error: any) => {
                setDataShow([]);
            });
        setDataShow([]);
    }
};

export const createZone = async (
    name: string,
    description: string,
    maxCapacity: string,
    address: string,
    selectedLatLng: any,
    status: boolean,
    setStatus: any,
    imageFile?: File
) => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");

        try {
            const { data } = await axios.post<ZoneRowData>(
                process.env.NEXT_PUBLIC_API_HOST + "/zones",
                {
                    name: name,
                    description: description,
                    maximumCapacity: parseInt(maxCapacity),
                    address: address,
                    occupancy: 0,
                    latitude: selectedLatLng.lat,
                    longitude: selectedLatLng.lng,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (data.id && imageFile) {
                const imageUrl = await uploadFileFirebase(
                    imageFile,
                    `zones/${data.id}`
                );
                await axios.patch(
                    process.env.NEXT_PUBLIC_API_HOST + "/zones/" + data.id,
                    { imageUrl: imageUrl },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            Swal.fire({
                icon: "success",
                title: "สร้างเรียบร้อยแล้ว",
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

            console.error("Error creating zone:", error);
        }
    }
};

export const countZone = async (setCount: any) => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");
        axios
            .get(process.env.NEXT_PUBLIC_API_HOST + "/zones", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCount(res.data.meta.itemCount);
            });
    }
};
