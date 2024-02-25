<!-- 树洞管理页面 -->
<template>
  <div class="user-mgmt-container">
    <!-- 搜索栏 -->
    <el-card style="margin: 8px">
      <avue-form
        ref="formRef"
        :option="searchOption"
        v-model="form"
        @submit="search"
      ></avue-form>
      <!-- 表格区 -->
      <avue-crud
        ref="crudRef"
        :option="tableOption"
        :data="data"
        :table-loading="loading"
        :page.sync="page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot="create_time" slot-scope="{ row }">
          {{ timeFormat(row.create_time) }}
        </template>
        <template slot="update_time" slot-scope="{ row }">
          {{ timeFormat(row.update_time) }}
        </template>
        <template slot="menu" slot-scope="{ row }">
          <el-button
            @click="updateConfirm(row)"
            type="text"
            size="small"
            icon="el-icon-edit"
            >修改标签</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            style="color: red"
            @click="deleteSubmit(row)"
            >删除</el-button
          >
        </template>
        <template slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addTagConfirm()"
            >新增标签</el-button
          >
        </template>
      </avue-crud>
    </el-card>
    <!-- 修改/新增标签弹窗 -->
    <div>
      <update-tag-detail
        ref="updateTagDetail"
        @refresh="search(form, () => {})"
      ></update-tag-detail>
    </div>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/post/tag.js";
import { getTagListApi, deleteTagApi } from "../../api/tag.js";
import updateTagDetail from "./components/updateTagDetail.vue";
export default {
  components: {
    updateTagDetail,
  },
  data() {
    return {
      searchOption,
      tableOption,
      data: [],
      form: {},
      loading: false,
      page: {
        currentPage: 1,
        total: 0,
        background: false,
        pageSize: 10,
      },
    };
  },
  created() {
    this.search(this.form, () => {});
  },
  methods: {
    /** 标签搜索 */
    async search(form, done) {
      const { data: res } = await getTagListApi(form);
      if (res.code != 200) {
        done();
        return this.$message.error(res.describe);
      }
      this.data = res.data.data;
      this.page.total = res.data.total;
      done();
    },
    /** 过滤分页查询参数 */
    filteredForm(form) {
      return Object.entries(form).reduce((acc, [key, value]) => {
        if (!key.startsWith("$")) {
          acc[key] = value;
        }
        return acc;
      }, {});
    },
    /** 分页搜索 */
    sizeChange(val) {
      this.page.currentPage = 1;
      this.form.page = this.page.currentPage;
      this.form.pageSize = this.page.pageSize;
      console.log(this.form);
      this.search(this.filteredForm(this.form), () => {});
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.form.page = this.page.currentPage;
      this.form.pageSize = this.page.pageSize;
      this.search(this.filteredForm(this.form), () => {});
    },
    timeFormat(timeStr) {
      const date = new Date(timeStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedTime = `${year}-${month}-${day} 00:00:00`;
      return formattedTime;
    },
    /** 删除标签 */
    async deleteTag(tagId) {
      try {
        await deleteTagApi(tagId);
        this.$message.success("标签删除成功");
        this.search(this.form, () => {});
      } catch (err) {
        console.log("err", err);
        return this.$message.error(err);
      }
    },
    deleteSubmit(row) {
      this.$confirm(
        `是否删除该标签?<span style="color:#f56c6c;">(删除后无法恢复)</span>`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      )
        .then(() => {
          this.deleteTag(row.id);
        })
        .catch(() => {});
    },
    updateConfirm(row) {
      this.$refs.updateTagDetail.init(row, true);
    },
    addTagConfirm() {
      this.$refs.updateTagDetail.init(null, false);
    },
  },
};
</script>
<style lang="less" src="../../assets/style/post/index.less" scoped></style>
<style>
.el-tooltip__popper.is-dark {
  width: 400px;
}
</style>
