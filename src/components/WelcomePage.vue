<template>
  <v-container>
    <br />
    <br />
    <h1>
      Vue {{ vueVersion }} + Vuetify {{ vuetifyVersion }} + TypeScript
      {{ typescriptVersion }}
    </h1>
    <br />
    <br />
    <br />
    <v-row>
      <v-col class="font-weight-bold">
        <h2>Версии</h2>
        <br />
        <v-text-field
          readonly
          outlined
          v-model="libVersion"
          label="showcase3"
        ></v-text-field>
        <v-text-field
          readonly
          outlined
          v-model="appVersion"
          label="showcase3-demo"
        ></v-text-field>
      </v-col>
      <br />
      <v-col>
        <v-img :src="getImageUrl()" contain />
      </v-col>
    </v-row>
    <br />
    <br />
    <br />
    <h1>
      Vite {{ viteVersion }} + Vitest {{ vitestVersion }} + Cypress
      {{ cypressVersion }}
    </h1>
  </v-container>
</template>

<script lang="ts">
import appPackageInfo from "@/../package.json";
import libPackageInfo from "showcase3/package.json";
import vuePackageInfo from "vue/package.json";
import vuetifyPackageInfo from "vuetify/package.json";
import typescriptPackageInfo from "typescript/package.json";
import { setTitle } from "@/utils/common";
import vitePackageInfo from "vite/package.json";
import vitestPackageInfo from "vitest/package.json";
import cypressPackageInfo from "cypress/package.json";

export default {
  name: "WelcomePage",

  setup() {
    const getImageUrl = () => {
      return new URL(`../assets/welcome.png`, import.meta.url).href;
    };
    return { getImageUrl };
  },

  data: () => ({
    appVersion: appPackageInfo.version,
    libVersion: libPackageInfo.version,

    vueVersion: vuePackageInfo.version,
    vuetifyVersion: vuetifyPackageInfo.version,
    typescriptVersion: typescriptPackageInfo.version,

    viteVersion: vitePackageInfo.version,
    vitestVersion: vitestPackageInfo.version,
    cypressVersion: cypressPackageInfo.version,
  }),

  created() {
    setTitle("Welcome");
  },
};
</script>

<!--
<style lang="scss" scoped>
.v-text-field ::v-deep label {
  font-size: 1.4em;
}
</style>
-->
