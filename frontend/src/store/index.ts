import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    subForums: [],
    threads: [],
    posts: [],
    sidenavState: false,
  },
  mutations: {
    setCurrentUser(state, data) {
      state.currentUser = data;
    },
    setSubForums(state, data) {
      state.subForums = data;
    },
    setThreads(state, data) {
      state.threads = data;
    },
    setPosts(state, data) {
      state.posts = data;
    },
    toggleSidenav(state) {
      state.sidenavState = !state.sidenavState;
    },
  },
  actions: {
    async fetchSubForums({ commit }) {
      const result = await fetch("/api/subforums");
      commit("setSubForums", await result.json());
    },
    async fetchThreads({ commit }, id) {
      const result = await fetch("/api/threads");
      commit("setThreads", await result.json());
    },
    async fetchPosts({ commit }, id) {
      const result = await fetch("/api/posts");
      commit("setPosts", await result.json());
    },
  },
  modules: {},
});
