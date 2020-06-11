import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Store from "@/store";
import { getCurentUser } from "@/Api";
import Nprogress from "nprogress";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    // component: Home,
    component: () => import("../views/Login/index.vue"),
  },

  {
    path: "/about",
    name: "About",
    meta: { private: true },
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((item) => item.meta.private)) {
    if (Store.state.authModule.auth) next();
    else {
      getCurentUser().then((rsp: any) => {
        if (rsp.status === "OK") {
          Store.dispatch('')
          next();
        } else {
          next("/login");
        }
      });
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    Nprogress.start();
  }
  next();
});
router.afterEach((to, from) => {
  Nprogress.done();
});

export default router;
