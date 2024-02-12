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

export function formatDate(
  date: string | object | string[] | undefined | null,
) {
  if (!date) return null;

  if (typeof date !== "string") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    date = `${date[0]}-${date[1]}-${date[2]}`;
  }

  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}
export function parseDate(date: string | object | string[] | undefined | null) {
  if (!date) return null;

  if (typeof date !== "string") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    date = `${date[2]}.${date[1]}.${date[0]}`;
  }

  const [day, month, year] = date.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
