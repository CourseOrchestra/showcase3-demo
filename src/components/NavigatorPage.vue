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
import { Vue } from "vue-class-component";
import { setTitle } from "@/utils/common";

export default class NavigatorPage extends Vue {
  created() {
    setTitle("Навигатор");
  }
}
</script>
