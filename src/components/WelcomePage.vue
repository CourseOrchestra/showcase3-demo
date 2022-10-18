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
          v-model="libVersion"
          readonly
          outlined
          label="showcase3"
        ></v-text-field>
        <v-text-field
          v-model="appVersion"
          readonly
          outlined
          label="showcase3-demo"
        ></v-text-field>
        <v-btn href="stats.html" target="_blank" app color="secondary">
          Визуализация сборки
        </v-btn>
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

<script setup lang="ts">
import appPackageInfo from "@/../package.json";
import libPackageInfo from "showcase3/package.json";
import vuePackageInfo from "vue/package.json";
import vuetifyPackageInfo from "vuetify/package.json";
import typescriptPackageInfo from "typescript/package.json";
import { setTitle } from "@/utils/common";
import vitePackageInfo from "vite/package.json";
import vitestPackageInfo from "vitest/package.json";
import cypressPackageInfo from "cypress/package.json";

setTitle("Welcome");

const getImageUrl = () => {
  return new URL(`../assets/welcome.png`, import.meta.url).href;
};

const appVersion = appPackageInfo.version;
const libVersion = libPackageInfo.version;

const vueVersion = vuePackageInfo.version;
const vuetifyVersion = vuetifyPackageInfo.version;
const typescriptVersion = typescriptPackageInfo.version;

const viteVersion = vitePackageInfo.version;
const vitestVersion = vitestPackageInfo.version;
const cypressVersion = cypressPackageInfo.version;
</script>
