<template>
  <v-container>
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
        <v-img :src="require('../assets/welcome.png')" contain />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import appPackageInfo from "@/../package.json";
import libPackageInfo from "showcase3/package.json";
import { setTitle } from "@/utils/common";

export default {
  name: "WelcomePage",

  data: () => ({
    appVersion: appPackageInfo.version,
    libVersion: libPackageInfo.version,
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
