import axios from "./axios";

/**
 * 获取标签列表
 */
export function getTagListApi(params) {
  return axios.get(`/tag`, {
    params: params,
  });
}
