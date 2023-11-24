import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const editAdmin = (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  if (checkAuth()) {
    const url = process.env.NEXT_PUBLIC_API_HOST + "/admin/" + id;
    let data: any = {
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    if (password !== "") {
      data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      };
    }
    axios
      .patch(
        url,
        data,
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

export const deleteAdmin = async (id: number) => {
  try {
    if (checkAuth()) {
      const token = localStorage.getItem("access_token");
      axios
        .delete(process.env.NEXT_PUBLIC_API_HOST + "/admin/" + id.toString(), {
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
