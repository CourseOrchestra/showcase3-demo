<template>
  <v-app-bar color="teal-darken-4">
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-btn icon @click="openNew">
      <v-icon>mdi-plus-circle-outline</v-icon>
      <v-tooltip activator="parent" location="top"
        >Добавить нарушение
      </v-tooltip>
    </v-btn>

    <v-btn icon :disabled="disabled" @click="dialog = true">
      <v-icon>mdi-folder-outline</v-icon>
      <v-tooltip activator="parent" location="top"
        >Задать группу нарушений
      </v-tooltip>
    </v-btn>
  </v-app-bar>

  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedViolation"
      filter-display="menu"
      :value="violations"
      resizable-columns
      column-resize-mode="fit"
      row-group-mode="subheader"
      group-rows-by="group"
      sort-mode="multiple"
      :sort-order="1"
      removable-sort
      scrollable
      scroll-height="850px"
      table-style="min-width: 50rem"
    >
      <Column field="group" header="Группа" sortable></Column>
      <Column selection-mode="multiple" header-style="width: 3rem"></Column>
      <Column
        field="name"
        header="Наименование нарушения"
        sortable
        style="min-width: 200px"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по Наименование нарушения"
          />
        </template>
      </Column>
      <Column
        field="act"
        header="Ссылка на нормативный акт"
        sortable
        style="min-width: 200px"
      ></Column>
      <Column
        field="inspector"
        header="Инспектор"
        sortable
        style="min-width: 200px"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Поиск по Инспектор"
          />
        </template>
      </Column>
      <Column field="status" header="Статус" sortable style="min-width: 200px">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getStatusLabel(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
      <template #groupheader="slotProps">
        <div class="flex align-items-center gap-2 font-bold">
          <span>{{ slotProps.data.group }}</span>
        </div>
      </template>
      <template #groupfooter="slotProps">
        <div class="flex justify-content-end font-bold w-full">
          Общее количество нарушений:
          {{ calculateViolationTotal(slotProps.data.group) }}
        </div>
      </template>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Нарушение"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Наименование нарушения</label>
      <InputText
        id="name"
        v-model.trim="product.name"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
      />
      <small v-if="submitted && !product.name" class="p-error"
        >Необходимо задать Наименование нарушения</small
      >
    </div>

    <div class="field">
      <label for="act">Ссылка на нормативный акт</label>
      <InputText id="name" v-model.trim="product.act" />
    </div>

    <div class="field">
      <label for="inspector">Инспектор</label>
      <InputText id="name" v-model.trim="product.inspector" />
    </div>

    <div class="field">
      <label for="status" class="mb-3">Статус</label>

      <Dropdown
        id="status"
        v-model="product.status"
        :options="statuses"
        placeholder="Выберите Статус"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <Tag
              :value="slotProps.value.value"
              :severity="getStatusLabel(slotProps.value.label)"
            />
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <Tag
              :value="slotProps.value"
              :severity="getStatusLabel(slotProps.value)"
            />
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Закрыть" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Сохранить" icon="pi pi-check" text @click="saveProduct" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    header="Подтверждение удаления"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Вы уверены, что хотите удалить <b>{{ product.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="Нет"
        icon="pi pi-times"
        text
        @click="deleteProductDialog = false"
      />
      <Button label="Да" icon="pi pi-check" text @click="deleteProduct" />
    </template>
  </Dialog>

  <v-dialog v-model="dialog" persistent width="450">
    <v-card>
      <v-card-title>
        <span class="text-h5">Задание группы нарушений</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-combobox
                v-model="selectedGroup"
                :items="violationsGroup"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Закрыть
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialogSave">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { ViolationService } from "@/service/ViolationService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { setTitle } from "@/utils/common";

setTitle("primevuedatagroup");

onMounted(() => {
  ViolationService.getViolations().then((data) => (violations.value = data));
});

const toast = useToast();
const product = ref({});
const submitted = ref(false);
const statuses = ref(["черновик", "подтверждено", "в акте"]);

const productDialog = ref(false);
const deleteProductDialog = ref(false);

const openNew = () => {
  product.value = { status: statuses.value[0] };
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
  submitted.value = true;

  if (product.value.name && product.value.name.trim()) {
    if (product.value.id) {
      violations.value[findIndexById(product.value.id)] = product.value;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated",
        life: 3000,
      });
    } else {
      product.value.id = createId();
      violations.value.push(product.value);

      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Created",
        life: 3000,
      });
    }

    productDialog.value = false;
    product.value = {};
  }
};
const editProduct = (prod) => {
  product.value = { ...prod };
  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  deleteProductDialog.value = true;
};

const deleteProduct = () => {
  violations.value = violations.value.filter(
    (val) => val.id !== product.value.id
  );
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Product Deleted",
    life: 3000,
  });
};

const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < violations.value.length; i++) {
    if (violations.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};

const createId = () => {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

//---------------------------------------------------------------------------------------------

const filters = ref();
const initFilters = () => {
  filters.value = {
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    inspector: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };
};

initFilters();

const violations = ref();
const selectedViolation = ref();

const dialog = ref(false);
const disabled = computed(
  () => !selectedViolation.value || selectedViolation.value.length === 0
);

const selectedGroup = ref();

const dialogSave = () => {
  selectedViolation.value.forEach(
    (violation) => (violation["group"] = selectedGroup.value)
  );
  dialog.value = false;
  selectedViolation.value = null;
};

const violationsGroup = computed(() =>
  Array.from(
    new Set(
      violations.value.map(function (violation) {
        return violation["group"];
      })
    )
  )
);

const calculateViolationTotal = (name) => {
  let total = 0;

  if (violations.value) {
    for (const violation of violations.value) {
      if (violation.group === name) {
        total++;
      }
    }
  }

  return total;
};

const getStatusLabel = (status) => {
  switch (status) {
    case "черновик":
      return "info";
    case "подтверждено":
      return "warning";
    case "в акте":
      return "success";
  }
};
</script>
