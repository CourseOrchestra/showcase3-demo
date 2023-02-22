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

setTitle("pageout");

const changes = ref(false);

window.addEventListener("beforeunload", function (e) {
  if (changes.value) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = "";
  }
});
</script>
