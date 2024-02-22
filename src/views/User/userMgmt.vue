<!-- 账号管理页面 -->
<template>
  <div class="user-mgmt-container">
    <!-- 搜索栏 -->
    <el-card style="margin: 8px">
      <avue-form ref="formRef" :option="searchOption" v-model="form" @submit="search"></avue-form>
      <!-- 表格区 -->
      <avue-crud ref="crudRef" :option="tableOption" :data="data" :table-loading="loading" :page.sync="page"
        @size-change="sizeChange" @current-change="currentChange">
        <template slot="gender" slot-scope="{ row }">
          {{ row.gender == "1" ? "女" : "男" }}
        </template>
        <template slot="roles" slot-scope="{ row }">
          <el-tag size="small" :type="roleNameFormat(row.roles[0].name || '')">
            {{ row.roles[0].name }}</el-tag>
        </template>
        <template slot="create_time" slot-scope="{ row }">
          {{ timeFormat(row.create_time) }}
        </template>
        <template slot="update_time" slot-scope="{ row }">
          {{ timeFormat(row.update_time) }}
        </template>
        <template slot="avatar" slot-scope="{ row }">
          <el-image :src="row.avatar" :preview-src-list="[row.avatar]" :preview-teleported="true">
          </el-image>
        </template>
        <template slot="menu" slot-scope="{ row }">
          <el-button @click="updateConfirm(row)" type="text" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button @click="resetConfirm(row)" type="text" icon="el-icon-refresh" style="color: #999ca1"
            size="small">重置密码</el-button>
          <el-button @click="deleteSubmit(row)" style="color: red" type="text" icon="el-icon-delete"
            size="small">删除</el-button>
        </template>
      </avue-crud>
    </el-card>
    <!-- 修改密码弹窗 -->
    <reset-pwd-modal ref="resetPwdModal" @refresh="search(form, () => { })"></reset-pwd-modal>
    <!-- 修改用户信息弹窗 -->
    <update-user-detail ref="updateUserDetail" @refresh="search(form, () => { })"></update-user-detail>
  </div>
</template>
<script>
import { searchOption, tableOption } from "/src/const/user/userMgmt";
import { getUserListApi, deleteUserApi } from "../../api/user";
import resetPwdModal from "./components/resetPwdModal.vue";
import updateUserDetail from "./components/updateUserDetail.vue";
export default {
  components: {
    resetPwdModal,
    updateUserDetail,
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
    /** 用户搜索 */
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
      const { data: res } = await getUserListApi(form);
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
    /** 打开修改密码弹窗 */
    resetConfirm(row) {
      this.$refs.resetPwdModal.init(row);
    },
    updateConfirm(row) {
      this.$refs.updateUserDetail.init(row);
    },
    timeFormat(timeStr) {
      const date = new Date(timeStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedTime = `${year}-${month}-${day} 00:00:00`;
      return formattedTime;
    },
    roleNameFormat(roleName) {
      switch (roleName) {
        case "管理员":
          return "success";
        case "超级管理员":
          return "success";
        case "普通用户":
          return "";
        case "心理咨询师":
          return "warning";
        default:
          return "";
      }
    },
    /** 删除用户 */
    async deleteUser(username) {
      try {
        await deleteUserApi(username);
        this.$message.success("用户删除成功");
        this.search(this.form, () => { });
      } catch(err) {
        console.log(err);
        return this.$message.error(err.describe);
      }
    },
    /** 删除用户按钮提交 */
    deleteSubmit(row) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteUser(row.username);
        })
        .catch(() => { });
    }
  },
};
</script>
<style
  lang="less"
  src="../../assets/style/user/userMgmt/index.less"
  scoped
></style>
