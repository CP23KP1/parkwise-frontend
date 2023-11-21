import { getPublicBasePath } from "./basePath";

export const checkAuth = () => {
  // TODO: create more auth to check token expried?
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  ) {
    return true;
  }
  return false;
};

export const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.href = getPublicBasePath("/login")
}

