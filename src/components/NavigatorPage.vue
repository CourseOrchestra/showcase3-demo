<template>
  <v-container>
    <br />
    <br />
    <br />
    <br />
    <h1 class="text-center">Демонстрация навигатора</h1>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "NavigatorPage",

  created() {
    setTitle("Навигатор");
  },
});
</script>
