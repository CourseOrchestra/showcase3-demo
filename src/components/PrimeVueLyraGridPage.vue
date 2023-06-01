<template>
  <div class="card p-fluid">
    <DataTable
      ref="dt"
      v-model:filters="filters"
      v-model:selection="selectedCustomers"
      :value="customers"
      lazy
      paginator
      :rows="10"
      data-key="id"
      :total-records="totalRecords"
      :loading="loading"
      filter-display="row"
      :global-filter-fields="[
        'name',
        'country.name',
        'company',
        'representative.name',
      ]"
      :select-all="selectAll"
      table-style="min-width: 75rem"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
    >
      <Column selection-mode="multiple" header-style="width: 3rem"></Column>
      <Column
        field="name"
        header="Name"
        filter-match-mode="startsWith"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search"
            @keydown.enter="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="country.name"
        header="Country"
        filter-field="country.name"
        filter-match-mode="contains"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search"
            @keydown.enter="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="company"
        header="Company"
        filter-match-mode="contains"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search"
            @keydown.enter="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="representative.name"
        header="Representative"
        filter-field="representative.name"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search"
            @keydown.enter="filterCallback()"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CustomerService } from "@/service/CustomerService";
import { setTitle } from "@/utils/common";

setTitle("primevuelyragrid");

onMounted(() => {
  loading.value = true;

  lazyParams.value = {
    first: 0,
    rows: dt.value.rows,
    sortField: null,
    sortOrder: null,
    filters: filters.value,
  };

  loadLazyData();
});

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const customers = ref();
const selectedCustomers = ref();
const selectAll = ref(false);
const filters = ref({
  name: { value: "", matchMode: "contains" },
  "country.name": { value: "", matchMode: "contains" },
  company: { value: "", matchMode: "contains" },
  "representative.name": { value: "", matchMode: "contains" },
});
const lazyParams = ref({});
/*
const columns = ref([
    {field: 'name', header: 'Name'},
    {field: 'country.name', header: 'Country'},
    {field: 'company', header: 'Company'},
    {field: 'representative.name', header: 'Representative'}
]);
*/

const loadLazyData = () => {
  loading.value = true;

  setTimeout(() => {
    CustomerService.getCustomers({
      lazyEvent: JSON.stringify(lazyParams.value),
    }).then((data) => {
      customers.value = data.customers;
      totalRecords.value = data.totalRecords;
      loading.value = false;
    });
  }, 0);
};
const onPage = (event) => {
  lazyParams.value = event;
  loadLazyData();
};
const onSort = (event) => {
  lazyParams.value = event;
  loadLazyData();
};
const onFilter = () => {
  lazyParams.value.filters = filters.value;
  loadLazyData();
};
const onSelectAllChange = (event) => {
  selectAll.value = event.checked;

  if (selectAll.value) {
    CustomerService.getCustomers().then((data) => {
      selectAll.value = true;
      selectedCustomers.value = data.customers;
    });
  } else {
    selectAll.value = false;
    selectedCustomers.value = [];
  }
};
const onRowSelect = () => {
  selectAll.value = selectedCustomers.value.length === totalRecords.value;
};
const onRowUnselect = () => {
  selectAll.value = false;
};
</script>
