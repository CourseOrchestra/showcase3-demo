const MAIN_TITLE = process.env.VUE_APP_TITLE;
export function setTitle(title) {
  document.title = title ? title + " - " + MAIN_TITLE : MAIN_TITLE;
}
