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

export function dateToStr(date: Date) {
  if (!date) return "";

  let month = "" + date.getMonth() + 1;
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
