import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const createCar = async (
  licensePlate: string,
  color: string,
  brand: string,
  model: string,
  year: string,
  ownerId: string
) => {
  try {
    if (checkAuth()) {
      const token = localStorage.getItem("access_token");
      await axios.post(
        process.env.NEXT_PUBLIC_API_HOST + "/cars",
        {
          licensePlate: licensePlate,
          color: color,
          brand: brand,
          model: model,
          year: parseInt(year),
          staffId: parseInt(ownerId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

export const fetchCar = (setCar: any) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/cars", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCar(res.data.data);
      });
  }
};
