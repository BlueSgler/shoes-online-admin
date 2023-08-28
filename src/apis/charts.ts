import { $http } from ".";

/**
 * 获取营销报表数据
 */
export const getMarketingApi = () => {
  return $http({
    method: "GET",
    url: "/admin/stat/marketing",
  });
};

/**
 * 获取业绩报表数据
 */
export const getChievementApi = () => {
  return $http({
    method: "GET",
    url: "/admin/stat/achievement",
  });
};

/**
 * 获取订单报表数据
 */
export const getOrderApi = () => {
  return $http({
    method: "GET",
    url: "/admin/stat/order",
  });
};
