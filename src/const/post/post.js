/**
 * 树洞文章 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "right",
  menuSpan: 25,
  gutter: 10,
  submitText: "搜索",
  column: [
    {
      label: "文章标题",
      labelWidth: 90,
      prop: "title",
      span: 4,
    },
    {
      label: "用户名",
      labelWidth: 90,
      prop: "username",
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
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
    {
      label: "文章标题",
      prop: "title",
      width: 200,
    },
    {
      label: "用户名",
      prop: "author",
      width: 200,
    },
    {
      label: "文章内容",
      prop: "content",
      slot: true,
      headerslot: true,
    },
    {
      label: "文章封面",
      prop: "coverUrl",
      width: 200,
    },
  ],
};
