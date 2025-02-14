import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/global",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/explorar",
      name: "explorer",
      component: () => import("../views/Explorer.vue"),
    },
    {
      path: "/analysis",
      name: "analysis",
      component: () => import("../views/Analysis.vue"),
    },
  ],
});

export default router;
