import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/forum/:subforum",
    name: "SubForum",

    component: () => import("../views/SubForum.vue"),
  },
  {
    path: "/forum/:subforum/:thread",
    name: "Thread",

    component: () => import("../views/Thread.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
