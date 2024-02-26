import axios from "./axios";

/**
 * 获取评论列表
 */
export function getCommentApi(params) {
  return axios.get(`/comment`, {
    params: params,
  });
}

/**
 * 删除评论
 */
export function deleteCommentApi(commentId) {
  return axios.delete(`/comment/delete?commentId=${commentId}`);
}
