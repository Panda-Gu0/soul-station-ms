<!-- 资格审核管理页面 -->
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
        <template slot="username" slot-scope="{ row }">
          {{ row.user.username }}
        </template>
        <template slot="evidenceUrl" slot-scope="{ row }">
          <el-image
            :src="row.evidenceUrl"
            :preview-src-list="[row.evidenceUrl]"
            :preview-teleported="true"
          >
          </el-image>
        </template>
        <template slot="status" slot-scope="{ row }">
          <span :style="{ color: statusFormat(row.status).color }">{{
            statusFormat(row.status).text
          }}</span>
        </template>
        <template slot="apply_time" slot-scope="{ row }">
          {{ timeFormat(row.apply_time) }}
        </template>
        <template slot="update_time" slot-scope="{ row }">
          {{ timeFormat(row.update_time) }}
        </template>
        <template slot="menu" slot-scope="{ row }">
          <div v-if="row.status == '1'">
            <el-button
              type="text"
              icon="el-icon-check"
              style="color: #67c23a"
              size="small"
              @click="auditSubmit(row, true)"
              >同意</el-button
            >
            <el-button
              type="text"
              icon="el-icon-close"
              style="color: #ff0000"
              size="small"
              @click="auditSubmit(row, false)"
              >拒绝</el-button
            >
          </div>
          <div v-else style="color: #ccc">审核结束</div>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/user/qualificationAuth";
import { getApplyListApi, auditApi } from "../../api/apply";
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
    /** 申请记录搜索 */
    async search(form, done) {
      this.handleTimeRange(
        form,
        "applyRange",
        "startApplyTime",
        "endApplyTime"
      );
      this.handleTimeRange(
        form,
        "updateRange",
        "startUpdateTime",
        "endUpdateTime"
      );
      const { data: res } = await getApplyListApi(form);
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
    statusFormat(status) {
      switch (status) {
        case "0":
          return { text: "未通过", color: "red" };
        case "1":
          return { text: "审核中", color: "#e6a23c" };
        case "2":
          return { text: "已通过", color: "green" };
        default:
          return "undefined";
      }
    },
    /** 审核通过与拒绝 */
    async audit(applyId, isPass) {
      try {
        await auditApi(applyId, { isPass });
        this.$message.success("操作成功");
        this.search(this.form, () => {});
      } catch (err) {
        console.log(err);
        return this.$message.error(err);
      }
    },
    auditSubmit(row, isPass) {
      this.$confirm(
        `是否<span style="color:#f56c6c;">${
          isPass ? "同意" : "拒绝"
        }</span>该申请?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning",
        }
      )
        .then(() => {
          this.audit(row.id, isPass);
        })
        .catch(() => {});
    },
  },
};
</script>
<style
  lang="less"
  src="../../assets/style/user/qualificationAuth/index.less"
  scoped
></style>
<style lang="less" scoped>
/deep/ .avue-form__menu {
  margin-top: 42px;
  margin-left: 5px;
}
</style>
