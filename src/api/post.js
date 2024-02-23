import axios from "./axios";
import qs from "qs";

/**
 * 获取文章列表
 */
export function getPostListApi(params) {
  const queryString = qs.stringify(params);
  return axios.get(`/posts?${queryString}`);
}

/**
 * 删除文章
 */
export function deletePostApi(postId) {
  return axios.delete(`/posts/delete?postId=${postId}`);
}

/**
 * 修改文章
 */
export function updatePostApi(data) {
  return axios.put(`/posts/update`, data);
}

/**
 * 修改文章封面
 */
export function uploadCoverApi(postId, data) {
  return axios.post(`/posts/uploadCover?postId=${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

