/**
 * 树洞评论 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "left",
  menuSpan: 4,
  gutter: 10,
  submitIcon: "el-icon-search",
  submitText: "搜索",
  column: [
    {
      label: "文章标题",
      labelWidth: 90,
      prop: "title",
      span: 3,
    },
    {
      label: "用户名",
      labelWidth: 90,
      prop: "username",
      span: 3,
    },
    {
      label: "创建时间",
      span: 4,
      type: "datetimerange",
      prop: "registerRange",
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
  align: "center",
  border: true,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
    {
      label: "评论用户",
      prop: "user",
      width: 80,
    },
    {
      label: "回复用户",
      prop: "replies",
      width: 80,
    },
    {
      label: "所属文章",
      prop: "post",
      width: 220,
    },
    {
      label: "评论内容",
      prop: "content",
    },
    {
      label: "创建时间",
      prop: "create_time",
      width: 130,
    },
    {
      label: "修改时间",
      prop: "update_time",
      width: 130,
    },
  ],
};
