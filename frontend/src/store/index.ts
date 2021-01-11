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
    async fetchThreadsFromId({ commit }, id) {
      const result = await fetch(`/api/threadsubforum/${id}`);
      commit("setThreads", await result.json());
    },
    async fetchPostsFromId({ commit }, id) {
      const result = await fetch(`/api/postthread/${id}`);
      commit("setPosts", await result.json());
    },
  },
  modules: {},
});
