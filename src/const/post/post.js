/**
 * 树洞文章 option 配置项
 */
export const searchOption = {
  labelPosition: "top",
  menuPosition: "left",
  menuSpan: 4,
  gutter: 10,
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
      label: "关联标签",
      span: 4,
      prop: "tagIds",
      type: "select",
      multiple: true,
      filterable: true,
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: `http://localhost:3000/tag?pageSize=9999999`,
      dicFormatter: (res) => {
        return res.data.data;
      },
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
      label: "文章封面",
      prop: "coverUrl",
      width: 180,
    },
    {
      label: "文章标题",
      prop: "title",
    },
    {
      label: "用户名",
      prop: "author",
      width: 80,
    },
    {
      label: "标签",
      prop: "tags",
      width: "180",
    },
    {
      label: "点赞量",
      prop: "likeCount",
      width: "80",
      sortable: true,
    },
    {
      label: "阅读量",
      prop: "readingCount",
      width: "80",
      sortable: true,
    },
    {
      label: "创建时间",
      prop: "create_time",
      width: "90",
    },
    {
      label: "修改时间",
      prop: "update_time",
      width: "90",
    },
  ],
};
