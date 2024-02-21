import axios from "./axios";
import qs from "qs";

/**
 * 获取文章列表
 */
export function getPostListApi(params) {
  const queryString = qs.stringify(params);
  return axios.get(`/posts?${queryString}`);
}
