import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Avue);
Vue.use(ElementUI, {
  // 设置默认的弹窗属性
  dialog: {
    closeOnClickModal: false,
  },
});
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
