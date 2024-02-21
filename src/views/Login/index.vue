<template>
  <div class="login-container">
    <div class="left">
      <div class="item-name">
        <img src="@/assets/images/item-title.png" />
      </div>
    </div>
    <div class="right">
      <div class="login-box">
        <div class="title-box">
          <span class="cn-title">欢迎登录</span>
          <span class="en-title">WLECOME TO LOGIN</span>
        </div>
        <div class="input-box">
          <el-form ref="ruleForm" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                placeholder="请输入管理员账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model.trim="loginForm.password"
                placeholder="请输入密码"
                clearable
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model.trim="loginForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <div
                class="verifcode-img"
                v-html="codeImg"
                @click="getLoginCode"
              ></div>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login()">登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, reactive, ref } from "vue";
// import { User, Lock, Grid } from "@element-plus/icons-vue";
// import { ElMessage, FormInstance, FormRules } from "element-plus";
import { getCodeApi, loginApi } from "../../api/user";
// import { useRoute, useRouter } from "vue-router";
// import { useStore } from "vuex";
import { setToken } from "../../utils/auth";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "管理员账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      codeImg: "", // 验证码图片
    };
  },
  created() {
    this.getLoginCode();
  },
  methods: {
    /** 获取登录图片  */
    async getLoginCode() {
      const { data } = await getCodeApi();
      this.codeImg = data;
    },
    /** 用户登录  */
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await loginApi(this.loginForm);
          if (res.code != 200) {
            return this.$message.error(res.describe);
          }
          // 存储登录信息
          this.$store.dispatch("login", {
            token: res.data.token,
            user: res.data.user,
          });
          setToken(`Bearer ${res.data.token}`);
          this.$router.push("home");
          return this.$message.success("登录成功");
        }
      });
    },
  },
};
// const loginForm = reactive({
//   username: "",
//   password: "",
//   code: "",
// });
// const codeImg = ref(""); // 验证码图片
// const store = useStore();
// const route = useRoute();
// const router = useRouter();

// const getLoginCode = async () => {
//   const { data } = await getCodeApi();
//   codeImg.value = data;
// };

// const login = async () => {
//   const isValid = await ruleFormRef.value.validate();
//   if (isValid) {
//     const { data: res } = await loginApi(loginForm);
//     if (res.code != 200) {
//       return ElMessage.error(res.describe);
//     }
//     // 存储登录信息
//     store.dispatch("login", {
//       token: res.data.token,
//       user: res.data.user,
//     });
//     setToken(`Bearer ${res.data.token}`);
//     router.push("home");
//     return ElMessage.success("登录成功");
//   }
// };

// onMounted(() => {
//   getLoginCode();
// });

// /**
//  * 登录校验规则
//  */
// const ruleFormRef = ref();
// const rules = reactive({
//   username: [
//     { required: true, message: "管理员账号不能为空", trigger: "blur" },
//   ],
//   password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
//   code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
// });
</script>
<style lang="less" src="../../assets/style/login/index.less" scoped></style>
