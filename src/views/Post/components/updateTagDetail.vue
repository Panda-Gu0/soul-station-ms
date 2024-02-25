<!-- 修改/新增标签弹窗 -->
<template>
  <div class="reset-pwd-container">
    <el-dialog
      :title="isUpdate ? '修改标签' : '新增标签'"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="resetModal"
      :close-on-click-modal="false"
    >
      <!-- 修改 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        v-if="isUpdate"
      >
        <el-form-item label="新标签名" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 新增 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="80px"
        v-else
      >
        <el-form-item label="新标签名" prop="name">
          <el-input v-model.trim="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetModal">取 消</el-button>
        <el-button type="primary" @click="submit">{{
          isUpdate ? "修 改" : "新增"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateTagApi, createTagApi } from "@/api/tag";
export default {
  data() {
    return {
      dialogVisible: false,
      isUpdate: true,
      ruleForm: {
        id: "",
        name: "",
      },
      addForm: {
        name: "",
      },
      addRules: {
        name: { required: true, message: "标签名不能为空", trigger: "blur" },
      },
      rules: {
        name: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    /**
     * 弹窗初始化
     * @param flag - true:修改, false:新增
     */
    init(row, flag) {
      this.isUpdate = flag;
      this.dialogVisible = true;
      if (flag) {
        this.ruleForm.id = row.id;
        this.ruleForm.name = row.name;
        console.log("row", row);
      }
    },
    /** 关闭弹窗清除内容 */
    resetModal() {
      this.isUpdate
        ? this.$refs.ruleForm.resetFields()
        : this.$refs.addForm.resetFields();
      this.dialogVisible = false;
    },
    /** 修改/新增标签名 */
    async handle() {
      try {
        this.isUpdate
          ? await updateTagApi(this.ruleForm)
          : await createTagApi(this.addForm);
        this.$message.success(this.isUpdate ? "标签修改成功" : "新增标签成功");
        this.$emit("refresh");
        this.resetModal();
      } catch (err) {
        console.log(this.$message.error(err));
      }
    },
    submit() {
      this.isUpdate
        ? this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
              this.handle();
            }
          })
        : this.$refs.addForm.validate(async (valid) => {
            if (valid) {
              this.handle();
            }
          });
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
