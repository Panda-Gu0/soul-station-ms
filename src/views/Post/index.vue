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
        <template slot="coverUrl" slot-scope="{ row }">
          <el-image
            :src="row.coverUrl"
            :preview-src-list="[row.coverUrl]"
            :preview-teleported="true"
          >
          </el-image>
        </template>
        <template slot="author" slot-scope="{ row }">
          {{ row.author.username }}
        </template>
        <template slot="content" slot-scope="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.content"
            placement="top-start"
          >
            <avue-text-ellipsis :text="row.content" :height="50">
              <small slot="more">...</small>
            </avue-text-ellipsis>
          </el-tooltip>
        </template>
        <template slot="menu" slot-scope="{ row }">
          <el-button type="text">文章详情</el-button>
          <el-button type="text">修改文章</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/post/post.js";
import { getPostListApi } from "../../api/post";
export default {
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
    /** 用户搜索 */
    async search(form, done) {
      const { data: res } = await getPostListApi(form);
      console.log("res", res);
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
    /** 打开修改密码弹窗 */
    resetConfirm(row) {
      this.$refs.resetPwdModal.init(row);
    },
    updateConfirm(row) {
      this.$refs.updateUserDetail.init(row);
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
