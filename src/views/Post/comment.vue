<!-- 评论管理页面 -->
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
        <template slot="user" slot-scope="{ row }">
          {{ row.user.username }}
        </template>
        <template slot="replies" slot-scope="{ row }">
          <div v-if="row.replies && row.replies.length > 0">
            <div v-for="item in row.replies" :key="item.id">
              {{ item.user.username }}
            </div>
          </div>
          <div v-else style="color: #909399">无</div>
        </template>
        <template slot="content" slot-scope="{ row }">
          {{ row.content }}
        </template>
        <template slot="post" slot-scope="{ row }">
          {{ `《 ${row.post.title} 》` }}
        </template>
        <template slot="create_time" slot-scope="{ row }">
          {{ timeFormat(row.create_time) }}
        </template>
        <template slot="update_time" slot-scope="{ row }">
          {{ timeFormat(row.update_time) }}
        </template>
        <template slot="menu" slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            style="color: red"
            @click="deleteSubmit(row)"
            >删除</el-button
          >
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/post/comment.js";
import { getCommentApi, deleteCommentApi } from "../../api/comment";
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
    /** 处理时间范围 */
    handleTimeRange(form, timerangeField, startField, endField) {
      if (form && form[timerangeField]) {
        form[startField] = form[timerangeField][0];
        form[endField] = form[timerangeField][1];
      }
      delete form[timerangeField];
    },
    /** 评论搜索 */
    async search(form, done) {
      this.handleTimeRange(
        form,
        "registerRange",
        "startCreateTime",
        "endCreateTime"
      );
      this.handleTimeRange(
        form,
        "updateRange",
        "startUpdateTime",
        "endUpdateTime"
      );
      const { data: res } = await getCommentApi(form);
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
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
    /** 删除评论 */
    async deleteComment(commentId) {
      try {
        await deleteCommentApi(commentId);
        this.$message.success("评论删除成功");
        this.search(this.form, () => {});
      } catch (err) {
        console.log(err);
        return this.$message.error(err.describe);
      }
    },
    deleteSubmit(row) {
      this.$confirm(
        `是否删除该评论?<span style="color:#f56c6c;">(删除后无法恢复)</span>`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      )
        .then(() => {
          this.deleteComment(row.id);
        })
        .catch(() => {});
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
