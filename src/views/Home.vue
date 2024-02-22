<template>
  <div class="home-container common-layout">
    <el-container style="height: 100%">
      <!-- 侧边栏 -->
      <el-aside width="collapse">
        <el-menu :default-active="activePath" :collapse="isCollapse" background-color="#00162a" text-color="#687a89"
          class="el-menu-vertical-demo" style="height: 100%">
          <div class="logo">
            <img src="../assets/images/logo.png" />
            <span v-if="!isCollapse">心灵驿站管理平台</span>
          </div>
          <el-submenu index="/home/user">
            <template slot="title">
              <el-icon>
                <span class="iconfont icon-renyuanguanli"></span>
              </el-icon>
              <span>用户管理</span>
            </template>
            <router-link to="/home/user/usermgmt" @click="setActivePath()">
              <el-menu-item index="/home/user/usermgmt">
                <el-icon>
                  <span class="iconfont icon-yuangongguanli"></span>
                </el-icon>
                账号管理
              </el-menu-item>
            </router-link>
            <router-link to="/home/user/qualificationAuth" @click="setActivePath()">
              <el-menu-item index="/home/user/qualificationAuth">
                <el-icon>
                  <span class="iconfont icon-zigerenzheng1"></span>
                </el-icon>
                心理咨询师认证
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="/home/car">
            <template slot="title">
              <el-icon>
                <span class="iconfont icon-luntai" style="font-size: 20px"></span>
              </el-icon>
              <span>车辆管理</span>
            </template>
            <router-link to="/home/car/carinfo" @click="setActivePath()">
              <el-menu-item index="/home/car/carinfo">
                <el-icon>
                  <span class="iconfont icon-xplat-9" style="font-size: 20px"></span>
                </el-icon>
                车辆信息管理
              </el-menu-item>
            </router-link>
            <router-link to="/home/car/maint" @click="setActivePath()">
              <el-menu-item index="/home/car/maint">
                <el-icon>
                  <span class="iconfont icon-weixiudan" style="font-size: 16px"></span>
                </el-icon>
                维修信息管理
              </el-menu-item>
            </router-link>
          </el-submenu>
          <!-- <router-link to="/home/post" @click="setActivePath()">
            <el-menu-item index="/home/post">
              <el-icon v-if="!isCollapse">
                <span class="iconfont icon-dingdan1"></span>
              </el-icon>
              <el-tooltip
                content="树洞管理"
                placement="right"
                v-if="isCollapse"
              >
                <el-icon>
                  <span
                    class="iconfont icon-dingdan1"
                    style="font-size: 20px"
                  ></span>
                </el-icon>
              </el-tooltip>
              <span v-if="!isCollapse">树洞管理</span>
            </el-menu-item>
          </router-link> -->
          <el-submenu index="/home/post">
            <template slot="title">
              <el-icon>
                <span class="iconfont icon-renyuanguanli"></span>
              </el-icon>
              <span>树洞管理</span>
            </template>
            <router-link to="/home/post" @click="setActivePath()">
              <el-menu-item index="/home/post">
                <el-icon>
                  <span class="iconfont icon-yuangongguanli"></span>
                </el-icon>
                文章管理
              </el-menu-item>
            </router-link>
            <router-link to="/home/post/comment" @click="setActivePath()">
              <el-menu-item index="/home/post/comment">
                <el-icon>
                  <span class="iconfont icon-zigerenzheng1"></span>
                </el-icon>
                评论管理
              </el-menu-item>
            </router-link>
            <router-link to="/home/post/tag" @click="setActivePath()">
              <el-menu-item index="/home/post/tag">
                <el-icon>
                  <span class="iconfont icon-zigerenzheng1"></span>
                </el-icon>
                标签管理
              </el-menu-item>
            </router-link>
          </el-submenu>
          <router-link to="/home/fdmgt" @click="setActivePath()">
            <el-menu-item index="/home/fdmgt">
              <el-icon v-if="!isCollapse">
                <span class="iconfont icon-caiwuguanli" style="font-size: 18px"></span>
              </el-icon>
              <el-tooltip content="财务统计" placement="right" v-if="isCollapse">
                <el-icon>
                  <span class="iconfont icon-caiwuguanli" style="font-size: 18px"></span>
                </el-icon>
              </el-tooltip>
              <span v-if="!isCollapse">财务统计</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="background-color: #ffffff; height: 60px">
          <span @click="isCollapse = !isCollapse" :class="[
            'fold',
            'iconfont',
            isCollapse ? 'icon-a-shouqi2' : 'icon-zhankai',
          ]"></span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="50" :src="user.avatar"></el-avatar>
              <span class="nickname">{{ user.nickname }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 主体部分 -->
        <el-main style="padding: 0; background: #f2f2f2">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { removeToken } from "/src/utils/auth.js";
export default {
  data() {
    return {
      activePath: "/home/usermgmt",
      isCollapse: false,
    };
  },
  created() {
    console.log(this.$route);
    this.setActivePath();
  },
  computed: {
    /** 获取当前登录用户 */
    user: function () {
      return this.$store.getters.getUser ? this.$store.getters.getUser : "";
    },
  },
  methods: {
    /** 防止当前路由路径刷新丢失 */
    setActivePath() {
      // if (this.$route.currentRoute._value.fullPath == "/home") {
      //   this.activePath = "/home/usermgmt";
      // } else {
      //   this.activePath = this.$route.currentRoute._value.fullPath;
      // }
    },
    /** 退出登录 */
    logOut() {
      this.$confirm("是否退出当前账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("logout");
          removeToken();
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "已成功退出当前账号",
          });
        })
        .catch((err) => {
          return;
        });
    },
  },
};
// import { ref, computed } from "vue";
// import {
//   Document,
//   User,
//   SwitchButton,
//   Menu as IconMenu,
//   Setting,
// } from "@element-plus/icons-vue";
// import { ElMessageBox, ElMessage } from "element-plus";
// import { removeToken } from "/src/utils/auth.js";
// import { useRouter } from "vue-router";
// import { useStore } from "vuex";

// const router = useRouter();
// const store = useStore();
// let activePath = "/home/usermgmt";
// const isCollapse = ref(false);

// /**
//  * 获取当前登录用户
//  */
// const user = computed(() => {
//   return store.getters.getUser ? store.getters.getUser : "";
// });

// const setActivePath = () => {
//   // 获取当前菜单激活路径
//   if (router.currentRoute._value.fullPath == "/home")
//     activePath = "/home/usermgmt";
//   else activePath = router.currentRoute._value.fullPath;
// };
// setActivePath();

// /**
//  * 退出登录
//  */
// const Logout = () => {
//   ElMessageBox.confirm("是否退出当前账号?", "提示", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//     type: "warning",
//     closeOnClickModal: false,
//   })
//     .then(() => {
//       store.dispatch("logout");
//       removeToken();
//       router.push("/login");
//       ElMessage({
//         type: "success",
//         message: "已成功退出当前账号",
//       });
//     })
//     .catch((err) => {
//       return;
//     });
// };
</script>

<style lang="less" scoped>
// 字体图标
.iconfont {
  font-size: 18px;
  margin-top: 2px;
}

// el-menu样式重写
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: #fff !important;
  background: none;
}

.el-menu-item.is-active {
  color: #fff !important;
  background: none;
}

.el-dropdown {
  float: right;

  .el-avatar {
    margin-top: 5px;
    border: 3px solid #ffffff;
    cursor: pointer;
  }
}

.el-header {
  box-shadow: 0 0 6px #ccc;

  .fold {
    font-size: 20px;
    margin-left: -5px;
    line-height: 60px;
    cursor: pointer;
  }
}

.el-dropdown-link:focus {
  outline: none;
}

.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;

  .el-avatar {
    margin-right: 10px;
  }
}

.home-container {
  height: 100vh;

  .logo {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #fff;

    img {
      width: 50px;
      vertical-align: middle;
      padding-right: 0px;
    }
  }
}
</style>
