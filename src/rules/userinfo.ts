import type { FormRules } from "element-plus";

export const rules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度3-10个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  nicknName: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
      message: "手机号格式不正确！",
      trigger: "blur",
    },
  ],
};
