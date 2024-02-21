// 封装请求配置拦截器
import axios from "axios";
import { showMessage } from "./status";
// import { ElMessage } from "element-plus";
import { getToken } from "../utils/auth";

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 设置请求地址
axios.defaults.baseURL = "http://localhost:3000";

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      Authorization: getToken(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      this.$message.warning("网络连接异常,请稍后再试!");
    }
  }
);

export default axios;
