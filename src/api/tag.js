import axios from "./axios";

/**
 * 获取标签列表
 */
export function getTagListApi(params) {
  return axios.get(`/tag`, {
    params: params,
  });
}

/**
 * 删除标签
 */
export function deleteTagApi(tagId) {
  return axios.delete(`/tag/delete?tagId=${tagId}`);
}

/**
 * 修改标签
 */
export function updateTagApi(data) {
  return axios.put(`/tag/update`, data);
}

/**
 * 新增标签
 */
export function createTagApi(data) {
  return axios.post(`/tag/create`, data);
}
