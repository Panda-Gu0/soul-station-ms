// 封装请求配置拦截器
import router from "../router/index.js";
import store from "../store"
import axios from "axios";
import { showMessage } from "./status";
import { Message, MessageBox } from 'element-ui';
import { getToken, removeToken } from "../utils/auth";


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
    if (response.data.code == "424") {
      MessageBox.confirm("当前token已过期,请重新登录", "提示", {
        confirmButtonText: "重新登录",
        closeOnClickModal: false,
        showClose: false,
        showCancelButton: false,
        type: "warning"
      }).then(() => {
        router.push('/login');
        store.dispatch("logout");
        removeToken();
      }).catch(() => { })
    }
    if (response) {
      showMessage(response.data.code);
      return Promise.reject(response.data.describe);
    } else {
      Message.warning("网络连接异常,请稍后再试!");
    }
  }
);

export default axios;
