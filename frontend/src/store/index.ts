import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      username: "Guest",
      roles: ["guest"],
      subforumId: [],
    },
    currentThread: {},
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
    setCurrentThread(state, data) {
      state.currentThread = data[0];
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
    deleteThread(state, data) {
      state.threads = state.threads.filter((thread: any) => thread.id !== data);
    },
    deletePost(state, data) {
      state.posts = state.posts.filter((post: any) => post.id !== data);
    },
    deleteUser(state, data) {
      state.users = state.posts.filter((user: any) => user.id !== data);
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
      const result = await fetch(`/api/postswithusernamethread/${id}`);
      commit("setPosts", await result.json());
    },
    async fetchUsers({ commit }) {
      const result = await fetch(`/api/users`);
      commit("setUsers", await result.json());
    },
    async fetchCurrentThread({ commit }, id) {
      const result = await fetch(`/api/threads/${id}`);
      commit("setCurrentThread", await result.json());
    },
    async deleteThread({ commit }, id) {
      await fetch(`/api/threads/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ subforum: router.currentRoute.params.subforum }),
      })
        .then((res) => {
          this.commit("deleteThread", id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deletePost({ commit }, id) {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ subforum: router.currentRoute.params.subforum }),
      })
        .then((res) => {
          this.commit("deletePost", id);
        })
        .catch((error) => console.error(error));
    },
    async deleteUser({ commit }, id) {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          this.commit("deleteUser", id);
        })
        .catch((error) => console.error(error));
    },
    async logoutUser({ commit }) {
      await fetch("/api/login", {
        method: "DELETE",
      })
        .then((res) => {
          this.commit("setCurrentUser", {
            username: "Guest",
            roles: ["guest"],
            subforumId: [],
          });
        })
        .catch((error) => {
          console.error(error);
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
      if (state.currentUser.subforumId === undefined) return false;
      const subforumId = router.currentRoute.params.subforum;
      return (
        state.currentUser.subforumId.some((item: any) => {
          item == subforumId;
        }) || state.currentUser.roles.includes("adminstrator")
      );
    },
  },
});
