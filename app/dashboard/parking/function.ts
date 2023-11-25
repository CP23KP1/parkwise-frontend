import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import Swal from "sweetalert2";

export const fetchParking = (
  setParking: any,
  setPage: any,
  setPageAll: any,
  page: string,
  search?: string,
  field?: string,
  order: string = "asc"
) => {
  if (page === undefined) {
    page = "1";
  }
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    axios
      .get(
        process.env.NEXT_PUBLIC_API_HOST +
          `/parking?page=${page}&&limit=10${search ? `&search=${search}` : ""}${
            field ? `&orderField=${field}` : ""
          }${order ? `&orderDirection=${order}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data.data;
        setPage(response.data.meta.page);
        setPageAll(response.data.meta.pageCount);
        setParking(data);
      });
  }
};

export const createParking = async (
  name: string,
  description: string,
  amount: number,
  zoneId: number
) => {
  if (checkAuth()) {
    const token = localStorage.getItem("access_token");
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_HOST + "/parking",
        {
          name: name,
          description: description,
          amount: parseInt(amount.toString()),
          zoneId: zoneId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "สร้างเรียบร้อยแล้ว",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        window.location.reload();
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
