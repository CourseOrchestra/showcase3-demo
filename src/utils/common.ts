import { $tt } from "@/plugins/i18n";
import { useCommonStore } from "@/stores/common";

export function setTitle(page: string) {
  const MAIN_TITLE = $tt("App.platform");

  const common = useCommonStore();

  if (page === "" && common.page !== "") {
    page = common.page;
  }

  document.title = page
    ? $tt("App.menu." + page) + " - " + MAIN_TITLE
    : MAIN_TITLE;

  common.setPage(page);
}
