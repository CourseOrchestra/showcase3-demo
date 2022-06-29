const MAIN_TITLE: string = process.env.VUE_APP_TITLE;
export function setTitle(title: string) {
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
