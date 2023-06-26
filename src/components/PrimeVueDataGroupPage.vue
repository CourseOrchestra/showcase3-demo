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

    <v-btn icon :disabled="disabled" @click="confirmDeleteSelected">
      <v-icon> mdi-delete</v-icon>
      <v-tooltip activator="parent" location="top"
        >Удалить выделенные нарушения
      </v-tooltip>
    </v-btn>

    <v-btn icon :disabled="disabled" @click="dialog = true">
      <v-icon>mdi-folder-outline</v-icon>
      <v-tooltip activator="parent" location="top"
        >Задать группу для выделенных нарушений
      </v-tooltip>
    </v-btn>

    <v-btn icon @click="exportCSV">
      <v-icon> mdi-file-excel</v-icon>
      <v-tooltip activator="parent" location="top"
        >Экспортировать таблицу в CSV"
      </v-tooltip>
    </v-btn>

    <v-app-bar-title>{{ $t("PrimeVueDataGroupPage.title") }} </v-app-bar-title>
  </v-app-bar>

  <Toast />

  <div class="card">
    <DataTable
      ref="dt"
      v-model:filters="filters"
      v-model:selection="selectedViolation"
      data-key="id"
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
      striped-rows
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
            @click="editViolation(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteViolation(slotProps.data)"
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
    v-model:visible="violationDialog"
    :style="{ width: '450px' }"
    header="Нарушение"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Наименование нарушения</label>
      <InputText
        id="name"
        v-model.trim="violation.name"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !violation.name }"
      />
      <small v-if="submitted && !violation.name" class="p-error"
        >Необходимо задать Наименование нарушения</small
      >
    </div>

    <div class="field">
      <label for="act">Ссылка на нормативный акт</label>
      <InputText id="name" v-model.trim="violation.act" />
    </div>

    <div class="field">
      <label for="inspector">Инспектор</label>
      <InputText id="name" v-model.trim="violation.inspector" />
    </div>

    <div class="field">
      <label for="status" class="mb-3">Статус</label>

      <Dropdown
        id="status"
        v-model="violation.status"
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

    <div class="field">
      <label for="group" class="mb-3">Группа</label>
      <Dropdown
        id="group"
        v-model="violation.group"
        :options="violationsGroup"
        editable
        show-clear
      >
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Закрыть" icon="pi pi-times" text @click="hideDialog" />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        text
        @click="saveViolation"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteViolationDialog"
    :style="{ width: '450px' }"
    header="Подтверждение удаления"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="violation"
        >Вы уверены, что хотите удалить <b>{{ violation.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="Нет"
        icon="pi pi-times"
        text
        @click="deleteViolationDialog = false"
      />
      <Button label="Да" icon="pi pi-check" text @click="deleteViolation" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteViolationsDialog"
    :style="{ width: '450px' }"
    header="Подтверждение удаления"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="violation"
        >Вы уверены, что хотите удалить выделенные нарушения?</span
      >
    </div>
    <template #footer>
      <Button
        label="Нет"
        icon="pi pi-times"
        text
        @click="deleteViolationsDialog = false"
      />
      <Button
        label="Да"
        icon="pi pi-check"
        text
        @click="deleteSelectedViolations"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="dialog"
    :style="{ width: '450px' }"
    header="Задание группы нарушений"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <Dropdown
        id="group"
        v-model="selectedGroup"
        :options="violationsGroup"
        editable
        show-clear
      >
      </Dropdown>
    </div>

    <template #footer>
      <Button label="Закрыть" icon="pi pi-times" text @click="dialog = false" />
      <Button label="Сохранить" icon="pi pi-check" text @click="dialogSave" />
    </template>
  </Dialog>
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
const dt = ref();
const violation = ref({});
const submitted = ref(false);
const statuses = ref(["черновик", "подтверждено", "в акте"]);

const violationDialog = ref(false);
const deleteViolationDialog = ref(false);
const deleteViolationsDialog = ref(false);

const openNew = () => {
  violation.value = { status: statuses.value[0] };
  submitted.value = false;
  violationDialog.value = true;
};

const hideDialog = () => {
  violationDialog.value = false;
  submitted.value = false;
};
const saveViolation = () => {
  submitted.value = true;

  if (violation.value.name && violation.value.name.trim()) {
    if (violation.value.id) {
      violations.value[findIndexById(violation.value.id)] = violation.value;
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Нарушение обновлено",
        life: 3000,
      });
    } else {
      violation.value.id = createId();
      violations.value.push(violation.value);

      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Нарушение создано",
        life: 3000,
      });
    }

    violationDialog.value = false;
    violation.value = {};
  }
};
const editViolation = (viol) => {
  violation.value = { ...viol };
  violationDialog.value = true;
};
const confirmDeleteViolation = (viol) => {
  violation.value = viol;
  deleteViolationDialog.value = true;
};

const deleteViolation = () => {
  violations.value = violations.value.filter(
    (val) => val.id !== violation.value.id
  );
  deleteViolationDialog.value = false;
  violation.value = {};
  toast.add({
    severity: "success",
    summary: "Успешно",
    detail: "Нарушение удалено",
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

const confirmDeleteSelected = () => {
  deleteViolationsDialog.value = true;
};

const deleteSelectedViolations = () => {
  violations.value = violations.value.filter(
    (val) => !selectedViolation.value.includes(val)
  );
  deleteViolationsDialog.value = false;
  selectedViolation.value = null;
  toast.add({
    severity: "success",
    summary: "Успешно",
    detail: "Выделенные нарушения удалены",
    life: 3000,
  });
};

const exportCSV = () => {
  dt.value.exportCSV();
};

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
  toast.add({
    severity: "success",
    summary: "Успешно",
    detail: "Группа нарушений задана",
    life: 3000,
  });
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
