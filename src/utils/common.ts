import { $tt } from "@/plugins/i18n";

export function setTitle(title: string) {
  const MAIN_TITLE = $tt("App.platform");
  title = $tt("App.menu." + title);
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
