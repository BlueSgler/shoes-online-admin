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
