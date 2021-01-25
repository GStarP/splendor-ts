import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/game",
    component: () => import("@/views/Game.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
