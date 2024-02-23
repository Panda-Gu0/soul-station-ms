<!-- 修改密码弹窗 -->
<template>
  <div class="reset-pwd-container">
    <el-dialog
      title="修改用户信息"
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
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model.trim="ruleForm.nickname"></el-input>
        </el-form-item>
        <!-- 用户头像上传 -->
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="uploadchange"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户性别" prop="gender">
          <el-select v-model="ruleForm.gender" placeholder="请选择用户性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model.trim="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetModal">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserApi, uploadAvatarApi } from "@/api/user";
export default {
  data() {
    return {
      dialogVisible: false,
      username: "",
      imgUrl: "", // 真实用户头像地址
      previewUrl: "", // 本地图片预览地址
      files: [],
      ruleForm: {},
      rules: {
        nickname: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
          { max: 10, message: "用户昵称长度不能大于10个字符", trigger: "blur" },
        ],
        gender: {
          required: true,
          message: "用户性别不能为空",
          trigger: "change",
        },
        email: [
          { required: true, message: "用户邮箱不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
    };
  },
  methods: {
    /** 弹窗初始化 */
    init(row) {
      this.dialogVisible = true;
      console.log("row", row);
      const { nickname, gender, email, username, avatar } = row;
      this.imgUrl = avatar;
      this.previewUrl = avatar;
      this.username = username;
      this.ruleForm = { nickname, gender, email };
    },
    /** 关闭弹窗清除内容 */
    resetModal() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    /** 修改用户信息  */
    async update() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await updateUserApi(
            this.username,
            this.ruleForm
          );
          // 进行图片上传操作
          if (this.previewUrl === this.imgUrl) {
            console.log("无需上传图片");
          } else {
            await this.submitupload();
          }
          if (res.success) {
            this.$message.success(res.data.data);
            this.$emit("refresh"); // 回显数据
            this.resetModal();
          }
        }
      });
    },
    /** 文件格式大小判断处理  */
    uploadchange(file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/png",
      ];
      const isAllowedType = allowedTypes.includes(file.raw.type);
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isAllowedType) {
        this.$message.error("上传图片只能是 JPG、JPEG、GIF 或 PNG 格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      this.imgSaveToUrl(file);
      this.files = file.raw;
    },
    /* 提交按钮监听事件 */
    async submitupload() {
      // 判断是否存在预览图片信息,才执行post请求
      if (this.files.length !== 0) {
        let formData = new FormData();
        formData.append("file", this.files);
        return uploadAvatarApi(this.username, formData)
          .then((res) => {
            console.log("成功");
          })
          .catch((error) => {
            console.log("上传图片失败");
            console.log(error);
          });
      } else {
        return this.$message.error("请选择图片");
      }
    },
    /** 图片本地预览  */
    imgSaveToUrl(file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.files = file.raw;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  border-radius: 8px;
  display: block;
}
</style>
