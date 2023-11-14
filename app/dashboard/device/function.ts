import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const createDevice = async (
  name: string,
  description: string,
  price: string,
  zoneId: string
) => {
  try {
    if (checkAuth()) {
      const token = localStorage.getItem("access_token");
      await axios.post(
        process.env.NEXT_PUBLIC_API_HOST + "/devices",
        {
          name: name,
          description: description,
          price: parseInt(price),
          zone_id: parseInt(zoneId),
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
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "มีบางอย่างผิดพลาด",
      text: "กรุณาลองใหม่อีกครั้ง",
    });
  }
};

export const fetchDevice = (setDevice: any) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/devices", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDevice(res.data);
      });
  }
};

export const fetchZone = async (setData: any) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/zones", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      });
  }
};

export const editDevice = async (
  id: string,
  name: string,
  description: string,
  price: string,
  zoneId: string
) => {
  try {
    if (checkAuth()) {
      const token = localStorage.getItem("access_token");
      axios.put(
        process.env.NEXT_PUBLIC_API_HOST + "/zones/" + id,
        {
          name: name,
          description: description,
          price: parseFloat(price),
          zoneId: parseInt(zoneId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

export const deleteDevice = async (id: number) => {
  try {
    if (checkAuth()) {
      const token = localStorage.getItem("access_token");
      axios
        .delete(process.env.NEXT_PUBLIC_API_HOST + "/zones/" + id.toString(), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "ทำการลบเสร็จสิ้น",
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
  } catch (error) {}
};
