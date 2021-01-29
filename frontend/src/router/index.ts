import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

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
  {
    path: "/log-in",
    name: "Login",

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/security",
    name: "Security",
    component: () => import("../views/Security.vue"),
    meta: { requireAuth: true, requiresAdmin: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) ||
    to.matched.some((record) => record.meta.requiresAdmin)
  ) {
    const user = store.state.currentUser;
    if (user.roles.includes("guest")) {
      next({ name: "Login" });
    } else {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        if (user.roles.includes("adminstrator")) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
