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

export const fetchUsers = async (
  setUsers: any,
  setPage: any,
  setAllPage: any,
  page: any,
  search?: string,
  orderField?: string,
  order?: string
) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    if (page === undefined) page = 1;
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_HOST +
          `/admin?page=${page}&limit=10${search ? `&search=${search}` : ""}${
            orderField ? `&orderBy=${orderField}` : ""
          }${order ? `&orderDirection=${order}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        setUsers(data.data.data);
        setPage(data.data.meta.page);
        setAllPage(data.data.meta.pageCount);
      });
  }
};
