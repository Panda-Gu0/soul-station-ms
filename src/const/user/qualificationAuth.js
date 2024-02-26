/**
 * 心理咨询师认证 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "right",
  menuSpan: 25,
  gutter: 10,
  submitIcon: "el-icon-search",
  submitText: "搜索",
  column: [
    {
      label: "用户名",
      labelWidth: 90,
      prop: "age",
      span: 4,
    },
    {
      label: "用户名称",
      labelWidth: 90,
      prop: "nickname",
      span: 4,
    },
    {
      label: "申请时间",
      labelWidth: 90,
      prop: "applyTime",
      type: "datetime",
      span: 4,
    },
  ],
};

/**
 * 表格配置项
 */
export const tableOption = {
  index: true,
  align: "center",
  addBtn: false,
  column: [
    {
      label: "用户名",
      prop: "username",
    },
    {
      label: "用户昵称",
      prop: "nickname",
    },
    {
      label: "邮箱",
      prop: "email",
      width: 180,
    },
    {
      label: "审核资料",
      prop: "auditData",
    },
    {
      label: "申请时间",
      prop: "applyTime",
    },
  ],
};
