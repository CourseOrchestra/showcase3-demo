<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn href="."> Welcome </v-btn>
      <v-btn href="logocurs"> Логотип КУРСа </v-btn>
      <v-btn href="logoplatform"> Логотип Платформы </v-btn>
      <v-btn href="navigator"> Навигатор </v-btn>
      <v-btn href="grid"> Грид </v-btn>
      <v-btn href="urlstate"> Состояние в url </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      //
    };
  },
});
</script>

<style>
.v-btn {
  text-transform: none;
}
</style>
