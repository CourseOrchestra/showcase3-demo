<template>
  <vContainer>
    <br />
    <br />
    <br />
    <br />
<!--    tag::template_i18n[] -->
    <h1 class="text-center">{{ $t("UrlStatePage.title") }}</h1>
<!--    end::template_i18n[] -->
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";

setTitle("urlstate");
</script>
