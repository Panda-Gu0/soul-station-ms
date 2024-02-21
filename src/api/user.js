import axios from "./axios";
import qs from "qs";

/**
 * 获取登录验证码
 */
export function getCodeApi() {
  return axios.get("/auth/code");
}

/**
 * 账号登录
 */
export function loginApi(data) {
  return axios.post("/auth/login", data);
}

/**
 * 获取用户列表
 */
export function getUserListApi(params) {
  const queryString = qs.stringify(params);
  return axios.get(`/user?${queryString}`);
}

/**
 * 修改用户密码
 */
export function resetPwdApi(data) {
  return axios.post("/user/setPwd", data);
}

/**
 * 修改用户信息
 */
export function updateUserApi(username, data) {
  return axios.put(`/user/update?username=${username}`, data);
}

/**
 * 修改用户头像
 */
export function uploadAvatarApi(username, data) {
  console.log("dataaa", data);
  return axios.post(`/user/uploadAvatar?username=${username}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
