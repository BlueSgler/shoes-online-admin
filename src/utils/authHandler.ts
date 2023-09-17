import { httpInstance } from "@/apis";
import router from "@/router";
import { ref } from "vue";

export interface Userinfo {
  avater: string;
  email: string;
  gender: number;
  integration: number;
  nickname: string;
  phoneNumber: string;
  username: string;
}

export const userinfo = ref<Userinfo>();
export const setAuth = (token: string) => {
  console.log("set auth");

  httpInstance.defaults.headers.common.Authorization = token;
  console.log("set finish", httpInstance.defaults.headers.common.Authorization);

  localStorage.setItem("token", token);
};
export const authFromLoacl = () => {
  const token = localStorage.getItem("token");

  if (token) {
    setAuth(token);
    return true;
  }
  return false;
};
export const removeAuth = () => {
  delete httpInstance.defaults.headers.common.Authorization;
  localStorage.removeItem("token");
  router.push("/login");
};
