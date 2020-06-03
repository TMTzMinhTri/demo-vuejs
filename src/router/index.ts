import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Store from "@/store";
import { getCurentUser } from "@/Api";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/demo-vuejs",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: () => {},
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((item) => item.meta.private)) {
    console.log(Store.state);
    if (Store.state.layOutModule.auth === true) {
      next();
    } else
      next({
        path: "/login",
      });
  }
});

// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start();
//   }
//   next();
// });
// router.afterEach((to, from) => {
//   NProgress.done();
// });

export default router;
