<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>
    <br />
    <br />

    <v-card width="300" title="Заголовок" variant="outlined"> </v-card>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";

setTitle("datepicker");
</script>
