import { $tt } from "@/plugins/i18n";

const MAIN_TITLE: string = import.meta.env.VITE_APP_TITLE;

export function setTitle(title: string) {
  title = $tt("App.menu." + title);
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
