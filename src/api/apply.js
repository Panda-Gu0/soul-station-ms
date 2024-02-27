import axios from "./axios";
import qs from "qs";

/**
 * 获取申请记录列表
 */
export function getApplyListApi(params) {
  const queryString = qs.stringify(params);
  return axios.get(`/apply?${queryString}`);
}

/**
 * 审核通过与拒绝
 */
export function auditApi(applyId, data) {
  return axios.post(`/apply/audit/?applyId=${applyId}`, data);
}
