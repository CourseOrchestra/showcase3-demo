<template>
  <vContainer fluid>
    <br />
    <br />
    <EasyDataTable
      v-model:server-options="serverOptions"
      :headers="headers"
      :items="items"
      :server-items-length="serverItemsLength"
      :loading="loading"
      buttons-pagination
      :rows-items="[10, 15, 25, 50]"
      :rows-per-page-message="$t('GridPage.rowsPerPageMessage')"
      show-index
      theme-color="#6200EE"
      :table-height="450"
    />

    <!--
    secondary:
    theme-color="#03DAC6"
-->

    <br />
    <h2>{{ restApiUrl }}</h2>
  </vContainer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { mockServerItems } from "@/utils/mock";
import { Header, ServerOptions, Item } from "vue3-easy-data-table";
import { setTitle } from "@/utils/common";
// tag::import_vuei18n[]
import { useI18n } from "vue-i18n";
// end::import_vuei18n[]
// tag::import_plugins_vuei18n[]
import { $tt } from "@/plugins/i18n";
// end::import_plugins_vuei18n[]
import { useRouter, useRoute } from "vue-router";
import { TIMER_INTERVAL } from "@/utils/constants";

setTitle("grid");

const headers: Header[] = [
  {
    // tag::vuei18n[]
    text: useI18n().t("GridPage.columns.name"),
    // end::vuei18n[]
    value: "name",
    sortable: true,
    width: 200,
    fixed: true,
  },
  {
    text: useI18n().t("GridPage.columns.address"),
    value: "address",
    sortable: true,
    width: 200,
    fixed: true,
  },
  {
    text: useI18n().t("GridPage.columns.height"),
    value: "height",
    sortable: true,
  },
  {
    text: useI18n().t("GridPage.columns.weight"),
    value: "weight",
    sortable: true,
  },
  {
    text: useI18n().t("GridPage.columns.age"),
    value: "age",
    sortable: true,
  },
  {
    text: useI18n().t("GridPage.columns.favouriteSport"),
    value: "favouriteSport",
    sortable: true,
    width: 400,
  },
  {
    text: useI18n().t("GridPage.columns.favouriteFruits"),
    value: "favouriteFruits",
    sortable: true,
    width: 500,
  },
];

const router = useRouter();
const route = useRoute();

const items = ref<Item[]>([]);

const serverItemsLength = ref(0);
const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10,
});

const restApiUrl = computed(() => {
  const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
  if (sortBy && sortType) {
    return `http://localhost:8080/api?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy}&sortType=${sortType}`;
  } else {
    return `http://localhost:8080/api?page=${page}&limit=${rowsPerPage}`;
  }
});

const loading = ref(false);

const loadFromServer = async () => {
  loading.value = true;
  const { serverCurrentPageItems, serverTotalItemsLength } =
    await mockServerItems(serverOptions.value);
  items.value = serverCurrentPageItems;
  serverItemsLength.value = serverTotalItemsLength;
  loading.value = false;
};

const mapModelToUrl = () => {
  const parameters: { [k: string]: any } = {};
  const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
  parameters["page"] = page;
  if (rowsPerPage) {
    parameters["limit"] = rowsPerPage;
  }
  if (sortBy && sortType) {
    parameters["sort-by"] = sortBy;
    parameters["sort-type"] = sortType;
  }
  return parameters;
};

const mapUrlToModel = (parameters: { [x: string]: any }) => {
  if (parameters["limit"] && parameters["page"]) {
    serverOptions.value.rowsPerPage = Number(parameters["limit"]);
    serverOptions.value.page = Number(parameters["page"]);
  } else {
    serverOptions.value.rowsPerPage = 10;
    serverOptions.value.page = 1;
  }

  if (parameters["sort-by"]) {
    serverOptions.value.sortBy = [parameters["sort-by"]];
    serverOptions.value.sortType = [parameters["sort-type"]];
  } else {
    serverOptions.value.sortBy = "";
    serverOptions.value.sortType = ["asc"];
  }
};

const setUrlByModelFilter = () => {
  router.replace({
    path: route.path,
    query: {
      ...mapModelToUrl(),
    },
  });
};

const setUrlByModelFilterWithTimeout = () => {
  // eslint-disable-next-line prefer-const
  let last_timeout;
  window.clearTimeout(last_timeout);
  last_timeout = window.setTimeout(() => {
    setUrlByModelFilter();
  }, TIMER_INTERVAL);
};

// first load when created
mapUrlToModel(route.query);
loadFromServer();

watch(
  serverOptions,
  (/*value*/) => {
    setUrlByModelFilterWithTimeout();
    loadFromServer();
  },
  { deep: true }
);

watch(
  () => route.query,
  (/*value*/) => {
    mapUrlToModel(route.query);
  },
  { deep: true }
);

watch(useI18n().locale, (/*value*/) => {
  // tag::plugins_vuei18n[]
  for (const header of headers) {
    header.text = $tt("GridPage.columns." + header.value);
  }
  // end::plugins_vuei18n[]
  loadFromServer();
});
</script>
