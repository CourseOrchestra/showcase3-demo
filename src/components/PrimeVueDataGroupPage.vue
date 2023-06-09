<template>
  <div class="card">
    <DataTable
      v-model:selection="selectedViolation"
      :value="violations"
      row-group-mode="subheader"
      group-rows-by="group"
      sort-mode="single"
      sort-field="group"
      :sort-order="1"
      scrollable
      scroll-height="850px"
      table-style="min-width: 50rem"
    >
      <Column field="group" header="Группа"></Column>
      <Column selection-mode="multiple" header-style="width: 3rem"></Column>
      <Column field="name" header="Название" style="min-width: 200px"></Column>
      <Column field="status" header="Статус" style="min-width: 200px">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column field="date" header="Дата" style="min-width: 200px"></Column>
      <Column header-style="width: 10rem">
        <template #body>
          <div class="flex flex-wrap gap-2">
            <Button
              type="button"
              icon="pi pi-pencil"
              rounded
              @click="editViolation()"
            />
          </div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ViolationService } from "@/service/ViolationService";
import { setTitle } from "@/utils/common";

setTitle("primevuedatagroup");

onMounted(() => {
  ViolationService.getViolations().then((data) => (violations.value = data));
});

const violations = ref();
const selectedViolation = ref();
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

const editViolation = () => {
  violations.value[1].group = "Группа нарушений 2";

  // customers.value[1].representative.name = "ggggggggggggg";

  //alert(customers.value[1].representative.name);
};
</script>
