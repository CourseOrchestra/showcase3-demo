<script setup lang="ts">
import { computed } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
  messages: {
    type: String,
    default: "",
  },
  errorMessages: {
    type: String || [],
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get() {
    return props.modelValue as string;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <c-field-col v-bind="$attrs">
    <v-textarea
      v-model="localValue"
      :readonly="readonly"
      :hidden="hidden"
      :label="label"
      :rows="rows"
      :messages="messages"
      :error-messages="errorMessages"
      clearable
      variant="solo"
      density="compact"
    />
  </c-field-col>
</template>
