<template>
  <v-container fill-height fluid>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-3 font-weight-bold mb-3">Демонстрация грида</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "GridPage",

  created() {
    setTitle("Грид");
  },
});
</script>