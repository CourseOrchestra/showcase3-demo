import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WelcomePage from "@/components/WelcomePage.vue";
import LogoCursPage from "@/components/LogoCursPage.vue";
import LogoPlatformPage from "@/components/LogoPlatformPage.vue";
import GridPage from "@/components/GridPage.vue";
import UrlStatePage from "@/components/UrlStatePage.vue";
import PageOutPage from "@/components/PageOutPage.vue";
import GridVuetifyPage from "@/components/GridVuetifyPage.vue";

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
    component: () => import("@/components/NavigatorPage.vue"),
  },
  {
    path: "/grid",
    name: "grid",
    component: GridPage,
  },
  {
    path: "/gridvuetify",
    name: "gridvuetify",
    component: GridVuetifyPage,
  },
  {
    path: "/urlstate",
    name: "urlstate",
    component: UrlStatePage,
  },
  {
    path: "/pageout",
    name: "pageout",
    component: PageOutPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
