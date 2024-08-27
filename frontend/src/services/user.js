import axios from "axios";
import Cookies from "js-cookie";

export async function getNames() {
  return axios.get("/api/user/names").then((response) => {
    return response.status === 200 ? response.data : null;
  });
}

export async function signOut() {
  Cookies.remove("displayName");
  Cookies.remove("username");
  window.location.href = "/api/auth/google/logout";
}
