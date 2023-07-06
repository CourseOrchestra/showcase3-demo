<template>
  <vContainer>
    <br />
    <br />
    <br />
    <br />
    <v-checkbox
      v-model="changes"
      :label="$t('PageOutPage.changes')"
    ></v-checkbox>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { $tt } from "@/plugins/i18n";

setTitle("pageout");

const changes = ref(false);

onBeforeRouteLeave(() => {
  if (changes.value) {
    // eslint-disable-next-line no-alert
    const answer = window.confirm($tt("PageOutPage.confirmAlert"));
    if (!answer) return false;
  }
});

window.addEventListener("beforeunload", function (e) {
  if (changes.value) {
    e.preventDefault();
    e.returnValue = "";
  }
});
</script>
