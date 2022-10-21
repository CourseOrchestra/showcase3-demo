<template>
  <vContainer>
    <br />
    <br />
    <br />
    <br />
    <h1 class="text-center">{{ $t("UrlStatePage.title") }}</h1>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";

setTitle("Состояние в url");
</script>
