import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const editStaff = (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  mobileNo: string
) => {
  if (checkAuth()) {
    const url = process.env.NEXT_PUBLIC_API_HOST + "/staffs/" + id;
    axios
      .patch(
        url,
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phoneNumber: mobileNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        .delete(process.env.NEXT_PUBLIC_API_HOST + "/staffs/" + id.toString(), {
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
