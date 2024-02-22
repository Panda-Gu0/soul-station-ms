<!-- 树洞管理页面 -->
<template>
  <div class="user-mgmt-container">
    <!-- 搜索栏 -->
    <el-card style="margin: 8px">
      <avue-form ref="formRef" :option="searchOption" v-model="form" @submit="search"></avue-form>
      <!-- 表格区 -->
      <avue-crud ref="crudRef" :option="tableOption" :data="data" :table-loading="loading" :page.sync="page"
        @size-change="sizeChange" @current-change="currentChange">
        <template slot="coverUrl" slot-scope="{ row }">
          <el-image :src="row.coverUrl" :preview-src-list="[row.coverUrl]" :preview-teleported="true"
            style="width: 100px;" v-if="row.coverUrl">
          </el-image>
          <div v-else style="color: #909399;">暂无封面</div>
        </template>
        <template slot="title" slot-scope="{ row }">
          {{ `《 ${row.title} 》` }}
        </template>
        <template slot="author" slot-scope="{ row }">
          {{ row.author.username }}
        </template>
        <template slot="content" slot-scope="{ row }">
          <el-tooltip class="item" effect="dark" :content="row.content" placement="top-start">
            <avue-text-ellipsis :text="row.content" :height="50">
              <small slot="more">...</small>
            </avue-text-ellipsis>
          </el-tooltip>
        </template>
        <template slot="tags" slot-scope="{ row }">
          <div v-if="row.tags && row.tags.length > 0"><el-tag v-for="item in row.tags" :key="item.id">{{ item.name
          }}</el-tag></div>
          <div v-else style="color: #909399;">暂无标签</div>
        </template>
        <template slot="create_time" slot-scope="{ row }">
          {{ timeFormat(row.create_time) }}
        </template>
        <template slot="update_time" slot-scope="{ row }">
          {{ timeFormat(row.update_time) }}
        </template>
        <template slot="menu" slot-scope="{ row }">
          <el-button type="text" size="small" icon="el-icon-view">文章详情</el-button>
          <el-button @click="updateConfirm(row)" type="text" size="small" icon="el-icon-edit">修改文章</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" style="color: red;"
            @click="deleteSubmit(row)">删除</el-button>
        </template>
      </avue-crud>
    </el-card>
    <!-- 修改文章弹窗 -->
    <update-post-detail ref="updatePostDetail" @refresh="search(form, () => { })"></update-post-detail>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/post/post.js";
import { getPostListApi, deletePostApi } from "../../api/post";
import updatePostDetail from "./components/updatePostDetail.vue";
export default {
  components: {
    updatePostDetail
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
    this.search(this.form, () => { });
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
    /** 文章搜索 */
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
      const { data: res } = await getPostListApi(form);
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
      this.search(this.filteredForm(this.form), () => { });
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.form.page = this.page.currentPage;
      this.form.pageSize = this.page.pageSize;
      this.search(this.filteredForm(this.form), () => { });
    },
    timeFormat(timeStr) {
      const date = new Date(timeStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedTime = `${year}-${month}-${day} 00:00:00`;
      return formattedTime;
    },
    /** 删除文章 */
    async deletePost(postId) {
      try {
        await deletePostApi(postId);
        this.$message.success("用户删除成功");
        this.search(this.form, () => { });
      } catch (err) {
        console.log(err);
        return this.$message.error(err.describe);
      }
    },
    deleteSubmit(row) {
      this.$confirm(`是否删除该文章?<span style="color:#f56c6c;">(删除后无法恢复)</span>`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        type: "warning",
      })
        .then(() => {
          this.deletePost(row.id);
        })
        .catch(() => { });
    },
    updateConfirm(row) {
      this.$refs.updatePostDetail.init(row);
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
