import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WelcomePage from "@/components/WelcomePage.vue";
import LogoCursPage from "@/components/LogoCursPage.vue";
import LogoPlatformPage from "@/components/LogoPlatformPage.vue";
//import NavigatorPage from "@/components/NavigatorPage.vue";
import GridPage from "../components/GridPage.vue";
import UrlStatePage from "../components/UrlStatePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: WelcomePage,
  },
  {
    path: "/logocurs",
    name: "logocurs",
    component: LogoCursPage,
  },
  {
    path: "/logoplatform",
    name: "logoplatform",
    component: LogoPlatformPage,
  },
  {
    path: "/navigator",
    name: "navigator",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/NavigatorPage.vue"),
  },
  {
    path: "/grid",
    name: "grid",
    component: GridPage,
  },
  {
    path: "/urlstate",
    name: "urlstate",
    component: UrlStatePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
