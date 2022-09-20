<template>
  <v-container fluid>
    <br />
    <br />
    <EasyDataTable
      v-model:server-options="serverOptions"
      :headers="headers"
      :items="items"
      :server-items-length="serverItemsLength"
      :loading="loading"
      buttons-pagination
      show-index
      theme-color="#6200EE"
      table-height="400"
    />

    <!--
    secondary:
    theme-color="#03DAC6"
-->

    <br />
    <h2>{{ restApiUrl }}</h2>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { mockServerItems } from "@/utils/mock";
import { Header, ServerOptions, Item } from "vue3-easy-data-table";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "GridPage",

  setup() {
    const headers: Header[] = [
      { text: "Name", value: "name", sortable: true, width: 200, fixed: true },
      {
        text: "Address",
        value: "address",
        sortable: true,
        width: 200,
        fixed: true,
      },
      { text: "Height", value: "height", sortable: true, width: 400 },
      { text: "Weight", value: "weight", sortable: true, width: 400 },
      { text: "Age", value: "age", sortable: true, width: 400 },
      {
        text: "Favourite sport",
        value: "favouriteSport",
        sortable: true,
        width: 400,
      },
      {
        text: "Favourite fruits",
        value: "favouriteFruits",
        sortable: true,
        width: 400,
      },
    ];
    const items = ref<Item[]>([]);

    const serverItemsLength = ref(0);
    const serverOptions = ref<ServerOptions>({
      page: 1,
      rowsPerPage: 15,
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

    // first load when created
    loadFromServer();

    watch(
      serverOptions,
      (/*value*/) => {
        loadFromServer();
      },
      { deep: true }
    );

    return {
      headers,
      items,
      serverOptions,
      serverItemsLength,
      restApiUrl,
      loading,
    };
  },

  created() {
    setTitle("Грид");
  },
});
</script>
