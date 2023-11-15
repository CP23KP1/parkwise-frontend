import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const fetchStaff = async (setStaff: any) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    await axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/staffs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setStaff(data.data.data);
      });
  }
};

export const createStaff = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .post(
        process.env.NEXT_PUBLIC_API_HOST + "/staffs",
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phoneNumber: phoneNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "ทำการสร้างเสร็จสิ้น",
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
