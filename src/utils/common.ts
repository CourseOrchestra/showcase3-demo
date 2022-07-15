const MAIN_TITLE: string = import.meta.env.VITE_APP_TITLE;
export function setTitle(title: string) {
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
