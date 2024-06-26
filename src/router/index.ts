import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WelcomePage from "@/components/WelcomePage.vue";
import LogoCursPage from "@/components/LogoCursPage.vue";
import LogoPlatformPage from "@/components/LogoPlatformPage.vue";
import UrlStatePage from "@/components/UrlStatePage.vue";
import PageOutPage from "@/components/PageOutPage.vue";
import GridVuetifyPage from "@/components/GridVuetifyPage.vue";
import VirtualListPage from "@/components/VirtualListPage.vue";
import GridVuetifyVirtualPage from "@/components/GridVuetifyVirtualPage.vue";
import PrimeVueDataTablePage from "@/components/PrimeVueDataTablePage.vue";
import PrimeVueTreeTablePage from "@/components/PrimeVueTreeTablePage.vue";
import PrimeVueDataTableVirtualPage from "@/components/PrimeVueDataTableVirtualPage.vue";
import PrimeVueLyraGridPage from "@/components/PrimeVueLyraGridPage.vue";
import PrimeVueTreeGroupPage from "@/components/PrimeVueTreeGroupPage.vue";
import PrimeVueDataGroupPage from "@/components/PrimeVueDataGroupPage.vue";
import DatePickerPage from "@/components/DatePickerPage.vue";
import SpellCheckPage from "@/components/SpellCheckPage.vue";

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
    path: "/datepicker",
    name: "datepicker",
    component: DatePickerPage,
  },
  {
    path: "/spellcheck",
    name: "spellcheck",
    component: SpellCheckPage,
  },
  {
    path: "/gridvuetify",
    name: "gridvuetify",
    component: GridVuetifyPage,
  },
  {
    path: "/gridvuetifyvirtual",
    name: "gridvuetifyvirtual",
    component: GridVuetifyVirtualPage,
  },
  {
    path: "/virtuallist",
    name: "virtuallist",
    component: VirtualListPage,
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
  {
    path: "/primevuedatatable",
    name: "primevuedatatable",
    component: PrimeVueDataTablePage,
  },
  {
    path: "/primevuelyragrid",
    name: "primevuelyragrid",
    component: PrimeVueLyraGridPage,
  },
  {
    path: "/primevuedatatablevirtual",
    name: "primevuedatatablevirtual",
    component: PrimeVueDataTableVirtualPage,
  },
  {
    path: "/primevuetreetable",
    name: "primevuetreetable",
    component: PrimeVueTreeTablePage,
  },
  {
    path: "/primevuetreegroup",
    name: "primevuetreegroup",
    component: PrimeVueTreeGroupPage,
  },
  {
    path: "/primevuedatagroup",
    name: "primevuedatagroup",
    component: PrimeVueDataGroupPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
