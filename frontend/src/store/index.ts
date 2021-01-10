import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    isLoggedIn: false,
    subForums: [],
    threads: [],
    posts: []
  },
  mutations: {
    setCurrentUser(state, data) {
      state.currentUser = data;
    }
  },
  actions: {},
  modules: {}
});
