import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
// tag::pinia[]
import { createPinia } from "pinia";
// end::pinia[]
// tag::persist[]
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// end::persist[]
import { i18n } from "./plugins/i18n";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import TreeTable from "primevue/treetable";
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import URLMapper from "@/library/URLMapper";

loadFonts();

// tag::def_pinia[]
const pinia = createPinia();
// end::def_pinia[]
// tag::use_persist[]
pinia.use(piniaPluginPersistedstate);
// end::use_persist[]

// tag::def2_pinia[]
const app = createApp(App)
  .use(pinia)
  // end::def2_pinia[]
  .use(i18n)
  .use(router)

  .use(PrimeVue, {
    locale: {
      startsWith: "Начинается с",
      contains: "Содержит",
      notContains: "Не содержит",
      endsWith: "Заканчивается",
      equals: "Равно",
      notEquals: "Не равно",
      noFilter: "Нет фильтра",
      filter: "Фильтр",
      lt: "Меньше чем",
      lte: "Меньше чем или равно",
      gt: "Более чем",
      gte: "Более чем или равно",
      dateIs: "Дата равна",
      dateIsNot: "Дата не равна",
      dateBefore: "Дата до",
      dateAfter: "Дата после",
      custom: "Пользовательский",
      clear: "Очистить",
      apply: "Принять",
      matchAll: "Сопоставить все",
      matchAny: "Совпадение с любым",
      addRule: "Добавить правило",
      removeRule: "Удалить правило",
      accept: "Да",
      reject: "Нет",
      choose: "Выбрать",
      upload: "Загрузить",
      cancel: "Отмена",
      completed: "Завершено",
      pending: "В ожидании",
      dayNames: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      dayNamesShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthNamesShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      chooseYear: "Выбрать год",
      chooseMonth: "Выбрать месяц",
      chooseDate: "Выбрать дату",
      prevDecade: "Предыдущее десятилетие",
      nextDecade: "Следующее десятилетие",
      prevYear: "Предыдущий год",
      nextYear: "Следующий год",
      prevMonth: "Предыдущий месяц",
      nextMonth: "Следующий месяц",
      prevHour: "Предыдущий час",
      nextHour: "Следующий час",
      prevMinute: "Предыдущая минута",
      nextMinute: "Следующая минута",
      prevSecond: "Предыдущая секунда",
      nextSecond: "Следующая секунда",
      am: "до полудня",
      pm: "после полудня",
      today: "Сегодня",
      weekHeader: "Нед.",
      firstDayOfWeek: 1,
      dateFormat: "dd.mm.yyyy",
      weak: "Простой",
      medium: "Нормальный",
      strong: "Хороший",
      passwordPrompt: "Введите пароль",
      emptyFilterMessage: "Результатов не найдено",
      searchMessage: "{0} результатов доступно",
      selectionMessage: "{0} элементов выбрано",
      emptySelectionMessage: "Нет выбранного элемента",
      emptySearchMessage: "Результатов не найдено",
      emptyMessage: "Нет доступных вариантов",
      aria: {
        trueLabel: "Верно",
        falseLabel: "Неверно",
        nullLabel: "Не выбран",
        star: "1 звезда",
        stars: "{star} звёзд",
        selectAll: "Выбраны все элементы",
        unselectAll: "Все элементы не выбраны",
        close: "Закрыть",
        previous: "Предыдущий",
        next: "Следующий",
        navigation: "Навигация",
        scrollTop: "Прокрутить в начало",
        moveTop: "Переместить в начало",
        moveUp: "Переместить вверх",
        moveDown: "Переместить вниз",
        moveBottom: "Переместить в конец",
        moveToTarget: "Переместить в приёмник",
        moveToSource: "Переместить в источник",
        moveAllToTarget: "Переместить всё в приёмник",
        moveAllToSource: "Переместить всё в источник",
        pageLabel: "{page}",
        firstPageLabel: "Первая страница",
        lastPageLabel: "Последняя страница",
        nextPageLabel: "Следующая страница",
        previousPageLabel: "Предыдущая страница",
        rowsPerPageLabel: "Строк на странице",
        jumpToPageDropdownLabel: "Перейти к раскрывающемуся списку страниц",
        jumpToPageInputLabel: "Перейти к вводу страницы",
        selectRow: "Выбрана строка",
        unselectRow: "Строка не выбрана",
        expandRow: "Строка развёрнута",
        collapseRow: "Строка свёрнута",
        showFilterMenu: "Показать меню фильтра",
        hideFilterMenu: "Скрыть меню фильтра",
        filterOperator: "Оператор фильтра",
        filterConstraint: "Ограничение фильтра",
        editRow: "Редактирование строки",
        saveEdit: "Сохранить правку",
        cancelEdit: "Отменить правку",
        listView: "В виде списка",
        gridView: "В виде сетки",
        slide: "Слайд",
        slideNumber: "{slideNumber}",
        zoomImage: "Увеличить изображение",
        zoomIn: "Увеличить",
        zoomOut: "Уменьшить",
        rotateRight: "Повернуть вправо",
        rotateLeft: "Повернуть влево",
      },
    },
  })

  .use(ToastService)
  .component("Toast", Toast)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("InputText", InputText)
  .component("Skeleton", Skeleton)
  .component("Tag", Tag)
  .component("Button", Button)
  .component("Dialog", Dialog)
  .component("Dropdown", Dropdown)
  .component("Checkbox", Checkbox)
  .component("TreeTable", TreeTable)

  .use(vuetify) /*.use(showcase3)*/
  .use(URLMapper, {
    router: router,
  })

  .component("EasyDataTable", Vue3EasyDataTable);

// tag::read_store[]
import { useInternationalizationStore } from "@/stores/internationalization";
const internationalization = useInternationalizationStore();
i18n.global.locale.value = internationalization.locale;
// end::read_store[]

vuetify.locale;

app.mount("#app");
