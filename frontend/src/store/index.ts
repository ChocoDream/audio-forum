import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    subForums: [],
    threads: [],
    posts: [],
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
  },
  actions: {
    async fetchSubForums({ commit }) {
      const result = await fetch('/api/subforums');
      commit("setSubForums", await result.json())
    },
  },
  modules: {},
});
