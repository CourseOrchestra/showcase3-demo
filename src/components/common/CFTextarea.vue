<script setup lang="ts">
import { ErrorDescr, StringField } from "@/apidtos/basetypes";
import { stringFieldDefaults } from "@/apidtos";
import type { PropType } from "vue";
import { computed } from "vue";
import CTextarea from "@/components/common/CTextarea.vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<StringField>,
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
  rows: {
    type: Number,
    default: 3,
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get() {
    return (props.modelValue as StringField) || stringFieldDefaults;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function getError(error: Array<ErrorDescr>) {
  return (
    error
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      .filter((it: any) => it.severity.error === 1)
      .map((arr) => arr.descr)
      .join("; ")
  );
}
function getWarning(error: Array<ErrorDescr>) {
  return (
    error
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      .filter((it: any) => it.severity.warning === 1)
      .map((arr) => arr.descr)
      .join("; ")
  );
}
</script>

<template>
  <c-field-col v-bind="$attrs">
    <c-textarea
      v-model="localValue.value"
      :label="props.label || localValue.label"
      :readonly="props.readonly || localValue.readonly"
      :hidden="localValue.hidden"
      :messages="getWarning(localValue.error)"
      :error-messages="getError(localValue.error)"
      :rows="rows"
    />
  </c-field-col>
</template>
