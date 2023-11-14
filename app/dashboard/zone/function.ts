import { ZoneRowData } from "@/app/assets/data/zone";
import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const fetchZone = (setDataShow: any) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/zones", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data as ZoneRowData[];
        setDataShow(data);
      })
      .catch((error: any) => {
        return [];
      });
    return [];
  }
};


export const createZone = async (
  name: string,
  description: string,
  maxCapacity: string,
  address: string,
  selectedLatLng: any,
  status: boolean,
  setStatus: any
) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_HOST + "/zones",
        {
          name: name,
          description: description,
          maximum_capacity: parseInt(maxCapacity),
          address: address,
          occupancy: 0,
          lat: selectedLatLng.lat,
          long: selectedLatLng.lng,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
