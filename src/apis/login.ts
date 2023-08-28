import { $http } from ".";

/**
 * 登录
 */
export const loginApi = (data: { password: string; username: string }) => {
  return $http({
    method: "POST",
    url: "/admin/login",
    data,
  });
};

/**
 * 获取用户信息
 */
export const getUserinfoApi = () => {
  return $http({
    method: "GET",
    url: "/user/info",
  });
}