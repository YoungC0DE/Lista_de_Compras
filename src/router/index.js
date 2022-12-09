import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/register",
      name: "Cadastro",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
  ],
});

export default router;
