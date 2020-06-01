import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
// import NProgress from "nprogress";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/demo-vuejs",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
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
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
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
