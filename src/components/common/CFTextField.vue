<script setup lang="ts">
import { DoubleField, IntegerField, StringField } from "@/apidtos/basetypes";
import type { PropType } from "vue";
import { computed } from "vue";
import CTextField from "@/components/common/CTextField.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<StringField | IntegerField | DoubleField>,
    required: true,
  },
  label: {
    type: String,
    default: "",
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
  <c-text-field
    v-model="localValue.value"
    :label="props.label || localValue.label"
    :type="type"
    :readonly="props.readonly || localValue.readonly || props.viewmode"
    :clearable="!props.readonly"
    :disabled="disabled"
  >
    <template v-if="$slots.append != null" #append>
      <slot name="append" />
    </template>
  </c-text-field>
</template>
