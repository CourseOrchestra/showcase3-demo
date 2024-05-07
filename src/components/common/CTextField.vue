<script setup lang="ts">
import { computed } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  viewmode: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <c-field-col v-bind="$attrs">
    <v-text-field
      v-model="localValue"
      :readonly="readonly || viewmode"
      :disabled="disabled"
      :hidden="hidden"
      :label="label"
      :clearable="clearable"
      :type="type"
      :placeholder="placeholder"
      variant="solo"
      density="compact"
    >
      <template v-if="$slots.append != null" #append>
        <div class="append-no-round"></div>
        <slot name="append" />
      </template>
    </v-text-field>
  </c-field-col>
</template>
