import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  await axios
    .post(process.env.NEXT_PUBLIC_API_HOST + "/auth/register", {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "ทำการสร้างผู้ดูแลระบบเรียบร้อยแล้ว",
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
};

export const fetchUsers = async (setUsers: any) => {
  if (checkAuth()) {
    await axios
      .get(process.env.NEXT_PUBLIC_API_HOST + "/admin")
      .then((data) => {
        setUsers(data.data.data);
      });
  }
};

