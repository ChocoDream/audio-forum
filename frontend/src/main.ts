import Vue from "vue";
import App from "./App.vue";
import vSelect from "vue-select";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "material-icons/iconfont/material-icons.css";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
