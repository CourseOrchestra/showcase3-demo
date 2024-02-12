<template>
  <c-field-col v-if="cols" :cols="`${cols}`">
    <v-btn v-bind="$attrs" class="c-btn" variant="plain">
      <slot></slot>
      <v-tooltip v-if="props.hint" activator="parent" location="top">
        {{ props.hint }}
      </v-tooltip>
    </v-btn>
  </c-field-col>

  <v-btn v-else v-bind="$attrs" class="c-btn">
    <slot></slot>
    <v-tooltip v-if="props.hint" activator="parent" location="top">
      {{ props.hint }}
    </v-tooltip>
  </v-btn>
</template>
<script setup lang="ts">
const props = defineProps({
  cols: {
    type: String,
    default: null,
  },
  hint: {
    type: String,
    default: null,
  },
});
import CFieldCol from "@/components/common/CFieldCol.vue";
</script>
