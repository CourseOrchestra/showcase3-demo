<template>
  <v-container fill-height fluid>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-3 font-weight-bold mb-3">
          Демонстрация состояния в url
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { setTitle } from "@/utils/common";

export default {
  name: "UrlStatePage",

  created() {
    setTitle("Состояние в url");
  },
};
</script>
