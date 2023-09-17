import { $http } from ".";

export const getUserlistApi = (params: {
  pageSize: number;
  requestPage: number;
}) => {
  console.log("getting");

  return $http({
    method: "GET",
    url: "/admin/user/listWithPage",
    params,
  });
};

export const updateUsersApi = (
  id: number,
  data: { nicknName: string; phoneNumber: string }
) => {
  return $http({
    method: "PUT",
    url: `/admin/user/${id}`,
    data,
  });
};

export const deleteUsersApi = (ids: number[]) => {
  const query = ids.join(",");
  return $http({
    method: "PUT",
    url: `/admin/user/disable/${query}`,
  });
};
