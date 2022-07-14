//const MAIN_TITLE: string = process.env.VUE_APP_TITLE;
const MAIN_TITLE = "Демо showcase3";
export function setTitle(title: string) {
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
