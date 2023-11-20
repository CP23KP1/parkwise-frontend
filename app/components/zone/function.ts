import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import { error } from "console";
import Swal from "sweetalert2";
export const editZone = async (
  id: string | number,
  name: string,
  description: string,
  maxCapacity: string,
  address: string,
  selectedLatLng: any
) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    await axios
      .patch(
        process.env.NEXT_PUBLIC_API_HOST + "/zones/" + id,
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
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จแล้ว",
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

export const deleteZone = async (id: string | number) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    await axios;
    await axios
      .delete(process.env.NEXT_PUBLIC_API_HOST + "/zones/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลเรียบร้อยแล้ว",
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
