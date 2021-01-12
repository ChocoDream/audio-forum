import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { username: "Guest", roles: ["guest"] },
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
    async fetchSubForums({ commit }, id = '') {
      const result = await fetch(`/api/subforums/${id}`);
      commit("setSubForums", await result.json());
    },
    async fetchThreadsWithSubForumId({ commit }, id) {
      const result = await fetch(`/api/threadsubforum/${id}`);
      commit("setThreads", await result.json());
    },
    async fetchPostsWithThreadId({ commit }, id) {
      const result = await fetch(`/api/postthread/${id}`);
      commit("setPosts", await result.json());
    },
    async logoutUser({ commit }) {
      await fetch("/api/login", {
        method: "DELETE",
      })
        .then((res) => {
          this.commit("setCurrentUser", { username: "Guest", roles: ["guest"] });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async whoami({ commit }) {
      if (this.state.currentUser.roles.includes("guest")) {
        await fetch("/api/login", {
          method: "GET",
        })
          .then((response) => {
            if (response.ok) return response.json();
            else return { username: "Guest", roles: ["guest"] };
          })
          .then((data) => {
            this.commit("setCurrentUser", data);
          });
      }
    },
  },
  modules: {},
});
