<template>
  <v-col
    :class="`v-col-${12} v-col-xl-${cols ?? 12}  v-col-md-${
      cols ?? 12
    } v-col-lg-${cols ?? 12} v-col-sm-${cols == null ? 12 : 6}`"
    class="c-field-col"
  >
    <slot></slot>
  </v-col>
</template>
<script setup lang="ts">
defineProps({
  cols: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
:not(.v-row) > .c-field-col {
  padding: 0 0 0 0;
}
</style>
