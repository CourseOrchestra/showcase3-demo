<template>
  <div class="card">
    <TreeTable :value="nodes">
      <Column field="name" header="Название" expander></Column>
      <Column field="status" header="Статус"></Column>
      <Column field="type" header="Тип"></Column>
    </TreeTable>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { setTitle } from "@/utils/common";

setTitle("primevuetreegroup");

const nodes = ref();

const files = [];
for (let i = 0; i < 10; i++) {
  const node = {
    key: i,
    data: {
      name: "Группа нарушений " + (i + 1),
    },
    children: [
      {
        key: i + " - 1",
        data: {
          name: "Нарушение " + (i + 1) + " - 1",
          status: Math.floor(Math.random() * 10) + 1,
          type: "Тип " + (Math.floor(Math.random() * 20) + 1),
        },
      },
      {
        key: i + " - 1",
        data: {
          name: "Нарушение " + (i + 1) + " - 2",
          status: Math.floor(Math.random() * 10) + 1,
          type: "Тип " + (Math.floor(Math.random() * 20) + 1),
        },
      },
      {
        key: i + " - 1",
        data: {
          name: "Нарушение " + (i + 1) + " - 3",
          status: Math.floor(Math.random() * 10) + 1,
          type: "Тип " + (Math.floor(Math.random() * 20) + 1),
        },
      },
    ],
  };

  files.push(node);
}

nodes.value = files;
</script>
