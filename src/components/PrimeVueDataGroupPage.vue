<template>
  <v-app-bar color="teal-darken-4">
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-btn icon :disabled="disabled" @click="dialog = true">
      <v-icon>mdi-folder-outline</v-icon>
      <v-tooltip activator="parent" location="top"
        >Задание группы нарушений
      </v-tooltip>
    </v-btn>
  </v-app-bar>

  <div class="card">
    <DataTable
      v-model:selection="selectedViolation"
      :value="violations"
      resizable-columns
      column-resize-mode="fit"
      row-group-mode="subheader"
      group-rows-by="group"
      sort-mode="single"
      sort-field="group"
      :sort-order="1"
      scrollable
      scroll-height="850px"
      table-style="min-width: 50rem"
    >
      <Column field="group" header="Группа" sortable></Column>
      <Column selection-mode="multiple" header-style="width: 3rem"></Column>
      <Column
        field="name"
        header="Название"
        sortable
        style="min-width: 200px"
      ></Column>
      <Column field="status" header="Статус" sortable style="min-width: 200px">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column
        field="date"
        header="Дата"
        sortable
        style="min-width: 200px"
      ></Column>
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

  <v-dialog v-model="dialog" persistent width="1024">
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
import { ViolationService } from "@/service/ViolationService";
import { setTitle } from "@/utils/common";

setTitle("primevuedatagroup");

onMounted(() => {
  ViolationService.getViolations().then((data) => (violations.value = data));
});

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
const getSeverity = (status) => {
  switch (status) {
    case "unqualified":
      return "danger";

    case "qualified":
      return "success";

    case "new":
      return "info";

    case "negotiation":
      return "warning";

    case "renewal":
      return null;
  }
};
</script>
