<template>
  <vContainer>
    <br />
    <br />
    <h1>
      Vue {{ vueVersion }} + Vuetify {{ vuetifyVersion }} + PrimeVue {{ primevueVersion }} + TypeScript
      {{ typescriptVersion }}
    </h1>
    <br />
    <br />
    <br />
    <vRow>
      <vCol class="font-weight-bold">
        <h2>{{ $t("WelcomePage.versions") }}</h2>
        <br />
        <vTextField
          v-model="libVersion"
          readonly
          outlined
          label="showcase3"
        ></vTextField>
        <vTextField
          v-model="appVersion"
          readonly
          outlined
          label="showcase3-demo"
        ></vTextField>
        <vBtn href="stats.html" target="_blank" app color="secondary">
          {{ $t("WelcomePage.visualization") }}
        </vBtn>
      </vCol>
      <br />
      <vCol>
        <vImg :src="getImageUrl()" contain />
      </vCol>
    </vRow>
    <br />
    <br />
    <br />
    <h1>
      Vite {{ viteVersion }} + Vitest {{ vitestVersion }} + Cypress
      {{ cypressVersion }}
    </h1>
  </vContainer>
</template>

<script setup lang="ts">
import appPackageInfo from "@/../package.json";
import libPackageInfo from "showcase3/package.json";
import vuePackageInfo from "vue/package.json";
import vuetifyPackageInfo from "vuetify/package.json";
import primevuePackageInfo from "primevue/package.json";
import typescriptPackageInfo from "typescript/package.json";
import { setTitle } from "@/utils/common";
import vitePackageInfo from "vite/package.json";
import vitestPackageInfo from "vitest/package.json";
import cypressPackageInfo from "cypress/package.json";

setTitle("welcome");

const getImageUrl = () => {
  return new URL(`../assets/welcome.png`, import.meta.url).href;
};

const appVersion = appPackageInfo.version;
const libVersion = libPackageInfo.version;

const vueVersion = vuePackageInfo.version;
const vuetifyVersion = vuetifyPackageInfo.version;
const primevueVersion = primevuePackageInfo.version;
const typescriptVersion = typescriptPackageInfo.version;

const viteVersion = vitePackageInfo.version;
const vitestVersion = vitestPackageInfo.version;
const cypressVersion = cypressPackageInfo.version;
</script>
