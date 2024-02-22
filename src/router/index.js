import Vue from "vue";
import Router from "vue-router";
import { existToken } from "../utils/auth.js";
import Home from "../views/Home.vue";
import UserMgmt from "../views/User/userMgmt.vue";
import QualificationAuth from "../views/User/qualificationAuth.vue";
import Login from "../views/Login/index.vue";
import Post from "../views/Post/index.vue";
import Comment from "../views/Post/comment.vue";
import Tag from "../views/Post/tag.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "user/usermgmt",
          name: "userMgmt",
          component: UserMgmt,
        },
        {
          path: "user/qualificationAuth",
          name: "qualificationAuth",
          component: QualificationAuth,
        },
        {
          path: "post",
          name: "post",
          component: Post,
        },
        {
          path: "post/comment",
          name: "comment",
          component: Comment,
        },
        {
          path: "post/tag",
          name: "tag",
          component: Tag,
        },
        {
          path: "",
          redirect: "user/usermgmt",
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

// 全局守卫

export default router;
