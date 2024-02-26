/**
 * 树洞标签 option 配置项
 */
export const searchOption = {
  labelPosition: "left",
  menuPosition: "left",
  menuSpan: 4,
  gutter: 10,
  submitIcon: "el-icon-search",
  submitText: "搜索",
  column: [
    {
      label: "标签名",
      labelWidth: 60,
      prop: "name",
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
  border: true,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
    {
      label: "标签名",
      prop: "name",
      width: 180,
    },
    {
      label: "关联文章数",
      prop: "postCount",
    },
    {
      label: "创建时间",
      prop: "create_time",
      width: "180",
    },
    {
      label: "修改时间",
      prop: "update_time",
      width: "180",
    },
    {
      label: "点击量",
      prop: "clickCount",
      width: "100",
      sortable: true,
    },
  ],
};
