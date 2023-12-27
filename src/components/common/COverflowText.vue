<template>
  <div
    class="c-overflow-text"
    :title="props.text"
    :style="`-webkit-line-clamp: ${props.lineClamp}`"
  >
    {{ props.text }}
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
