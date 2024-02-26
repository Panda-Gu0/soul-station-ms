/**
 * 账号管理 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "right",
  gutter: 10,
  searchMenuSpan: 2,
  submitIcon: "el-icon-search",
  submitText: "搜索",
  column: [
    {
      label: "用户名",
      labelWidth: 90,
      prop: "username",
      span: 4,
    },
    {
      label: "用户名称",
      labelWidth: 90,
      prop: "nickname",
      span: 4,
    },
    {
      label: "性别",
      labelWidth: 90,
      prop: "gender",
      type: "select",
      noDataText: "暂无数据",
      span: 4,
      dicData: [
        {
          label: "男",
          value: "0",
        },
        {
          label: "女",
          value: "1",
        },
      ],
    },
    {
      label: "邮箱",
      labelWidth: 90,
      prop: "email",
      span: 4,
    },
    {
      label: "角色类型",
      labelWidth: 90,
      prop: "roleId",
      type: "select",
      noDataText: "暂无数据",
      span: 4,
      dicData: [
        {
          label: "管理员",
          value: 2,
        },
        {
          label: "普通用户",
          value: 3,
        },
        {
          label: "心理咨询师",
          value: 4,
        },
      ],
    },
    {
      label: "注册时间",
      span: 4,
      type: "datetimerange",
      prop: "registerRange",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
    {
      label: "用户更新时间",
      span: 4,
      type: "datetimerange",
      prop: "updateRange",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
  ],
};

/**
 * 表格配置项
 */
export const tableOption = {
  index: true,
  indexLabel: "序号",
  indexWidth: 80,
  menuWidth: 220,
  align: "center",
  editBtn: false,
  delBtn: false,
  addBtn: false,
  border: true,
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
      label: "性别",
      prop: "gender",
      width: 80,
    },
    {
      label: "邮箱",
      prop: "email",
      width: 160,
    },
    {
      label: "用户头像",
      prop: "avatar",
    },
    {
      label: "角色类型",
      prop: "roles",
    },
    {
      label: "注册时间",
      prop: "create_time",
      width: 90,
    },
    {
      label: "更新时间",
      prop: "update_time",
      width: 90,
    },
  ],
};
