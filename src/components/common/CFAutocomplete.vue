<script setup lang="ts">
import { computed, PropType } from "vue";
import CAutocomplete from "@/components/common/CAutocomplete.vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    default: null,
  },
  modelId: {
    type: String,
    default: "uid",
  },
  modelName: {
    type: String,
    default: "displayName",
  },
  recordSet: {
    type: String,
    default: null,
  },
  recordSetSchema: {
    type: String,
    default: "aisgsn",
  },
  recordSetId: {
    type: String,
    default: "uid",
  },
  recordSetName: {
    type: String,
    default: "display_name",
  },
  sort: {
    type: Array as PropType<string[]>,
    default: new Array(["display_name"]),
  },
  filter: {
    type: String,
    default: "lower(display_name) like '%$search:lower%'",
  },
  label: {
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
  viewmode: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "update:modelName",
  "update:modelId",
  "update:modelValue",
]);
// const localModelName = computed({
//   get() {
//     return props.modelName as StringField;
//   },
//   set(value) {
//     emit("update:modelName", value);
//   },
// });
// const localModelId = computed({
//   get() {
//     return props.modelId as StringField;
//   },
//   set(value) {
//     // emit("update:modelId", value);
//   },
// });
const localModelValue = computed({
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
    <c-autocomplete
      :readonly="
        readonly || props.viewmode
      "
      :clearable="!readonly"
      :disabled="disabled"
      :record-set="recordSet"
      :record-set-name="recordSetName"
      :record-set-schema="recordSetSchema"
      :record-set-id="recordSetId"
      :filter="filter"
      :sort="sort"
    >
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </c-autocomplete>
  </c-field-col>
</template>
