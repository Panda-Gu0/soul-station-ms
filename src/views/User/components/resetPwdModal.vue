<!-- 修改密码弹窗 -->
<template>
  <div class="reset-pwd-container">
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="resetModal"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model.trim="ruleForm.newPassword"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetModal">取 消</el-button>
        <el-button type="primary" @click="resetSubmit">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { resetPwdApi } from "@/api/user";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        newPassword: "",
        username: "",
      },
      rules: {
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 8, message: "密码长度不能少于8个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /** 弹窗初始化 */
    init(row) {
      this.dialogVisible = true;
      console.log("row", row);
      this.ruleForm.username = row.username;
    },
    /** 关闭弹窗清除内容 */
    resetModal() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    /** 提交修改密码 */
    resetSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm("是否确定重置该用户密码?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.resetPwd();
            })
            .catch(() => {});
        }
      });
    },
    /** 请求修改密码 */
    async resetPwd() {
      const { data: res } = await resetPwdApi(this.ruleForm);
      if (res.success) {
        this.$message.success(res.data.data);
        this.$emit("refresh"); // 回显数据
        this.resetModal();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 4px;
}
/deep/ .el-dialog__footer {
  height: 64px;
  border: 2px solid #0000000d;
  .el-button {
    margin-top: 5px;
    width: 72px;
    height: 32px;
    padding: 0;
  }
}
</style>
