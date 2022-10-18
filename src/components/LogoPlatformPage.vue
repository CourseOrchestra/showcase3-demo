<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <br />
        <br />
        <LogoPlatform id="lplatform1"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform2"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform3"></LogoPlatform>
      </v-col>
      <v-col cols="4">
        <br />
        <br />
        <LogoPlatform id="lplatform4"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform5"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform6"></LogoPlatform>
      </v-col>
      <v-col cols="4">
        <br />
        <br />
        <LogoPlatform id="lplatform7"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform8"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform9"></LogoPlatform>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { LogoPlatform } from "showcase3";
import { setTitle } from "@/utils/common";

setTitle("Логотип Платформы");
</script>
