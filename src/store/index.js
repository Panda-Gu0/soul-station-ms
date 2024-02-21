import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      commit("setToken", token);
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setToken", null);
      commit("setUser", null);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.token !== null;
    },
  },
  plugins: [createPersistedState()], // 解决刷新丢失数据问题
});
