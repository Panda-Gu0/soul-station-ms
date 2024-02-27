/**
 * 心理咨询认证管理 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "left",
  menuSpan: 4,
  gutter: 10,
  searchMenuSpan: 2,
  submitIcon: "el-icon-search",
  submitText: "搜索",
  column: [
    {
      label: "申请用户名",
      labelWidth: 90,
      prop: "username",
      span: 4,
    },
    {
      label: "审核状态",
      labelWidth: 90,
      prop: "status",
      type: "select",
      noDataText: "暂无数据",
      span: 4,
      dicData: [
        {
          label: "未通过",
          value: "0",
        },
        {
          label: "审核中",
          value: "1",
        },
        {
          label: "已通过",
          value: "2",
        },
      ],
    },
    {
      label: "申请时间",
      span: 4,
      type: "datetimerange",
      prop: "applyRange",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
    {
      label: "修改时间",
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
      label: "申请资料",
      prop: "evidenceUrl",
    },
    {
      label: "审核状态",
      prop: "status",
    },
    {
      label: "申请时间",
      prop: "apply_time",
      width: 150,
    },
    {
      label: "更新时间",
      prop: "update_time",
      width: 150,
    },
  ],
};
