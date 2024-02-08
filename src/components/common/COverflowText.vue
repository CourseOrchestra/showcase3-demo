<template>
  <div
    class="c-overflow-text"
    :style="`-webkit-line-clamp: ${props.lineClamp}`"
  >
    {{ props.text }}
    <v-tooltip activator="parent" location="top"> {{ props.text }} </v-tooltip>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  lineClamp: {
    type: Number,
    default: 4,
  },
});
</script>

<style scoped>
.c-overflow-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
