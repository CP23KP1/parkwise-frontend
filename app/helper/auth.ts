import axios from "axios";
import { getPublicBasePath } from "./basePath";

export const checkAuth = () => {
  // TODO: create more auth to check token expired?
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  ) {
    const token = localStorage.getItem("refresh_token");
    try {
      const res =  axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "/auth/refresh",
        {
          headers: {
            Refresh: token,
          },
        }
      ).then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })

      return true;
    } catch (err) {
      logout();
      window.location.href = getPublicBasePath("/login");
      return false;
    }
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = getPublicBasePath("/login");
};
