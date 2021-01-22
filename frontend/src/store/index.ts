import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      username: "Guest",
      roles: ["guest"],
      moderatorSubForumId: [],
    },
    subForums: [],
    threads: [],
    posts: [],
    users: [],
    sidenavState: false,
    isModerator: false,
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
    setUsers(state, data) {
      state.users = data;
    },
    toggleSidenav(state) {
      state.sidenavState = !state.sidenavState;
    },
    setIsModerator(state, data) {
      state.isModerator = data;
    },
  },
  actions: {
    async fetchSubForums({ commit }, id = "") {
      const result = await fetch(`/api/subforums/${id}`);
      commit("setSubForums", await result.json());
    },
    async fetchThreadsWithSubForumId({ commit }, id) {
      const result = await fetch(`/api/threadssubforum/${id}`);
      commit("setThreads", await result.json());
    },
    async fetchPostsWithThreadId({ commit }, id) {
      const result = await fetch(`/api/poststhread/${id}`);
      commit("setPosts", await result.json());
    },
    async fetchUsers({ commit }) {
      const result = await fetch(`/api/users`);
      commit("setUsers", await result.json());
    },
    async logoutUser({ commit }) {
      await fetch("/api/login", {
        method: "DELETE",
      })
        .then((res) => {
          this.commit("setCurrentUser", {
            username: "Guest",
            roles: ["guest"],
          });
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
            else if (response.status === 400) {
              return { username: "Guest", roles: ["guest"] };
            }
          })
          .then((data) => {
            this.commit("setCurrentUser", data);
          });
      }
    },
  },
  modules: {},
  getters: {
    isModerator: (state) => {
      if (state.currentUser.moderatorSubForumId === undefined) return false;
      const subforumId = router.currentRoute.params.subforum;
      return (
        state.currentUser.moderatorSubForumId.some((item: any) => {
          item == subforumId;
        }) || state.currentUser.roles.includes("adminstrator")
      );
    },
    
  },
});
