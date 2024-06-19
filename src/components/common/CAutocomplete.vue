<!--  v-model -- поле с отображаемым наименованием-->
<!--  @update:model-value="updateModel($event)" -- updateModel -- обновляет все лукпаные поля, event -- выбранный id -->
<!--  @click:clear="clear()"> -- чистит uid и вызывает updateModel -->

<script setup lang="ts">
import { computed, PropType, reactive } from "vue";

const props = defineProps({
  modelValue: {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    type: Object as PropType<any>,
    required: false,
    default: null,
  },
  displayName: {
    type: String,
    default: null,
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
  hidden: {
    type: Boolean,
    default: false,
  },
  viewmode: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const localModel = computed<any>({
  get() {
    return props.displayName;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unused-vars*/
function search(event: any) {
  let searchString = event;
  if (!event) {
    /* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
    searchString = "";
  }
}

const items = reactive<Array<string>>([
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
]);
</script>

<template>
  <v-autocomplete
    :model-value="localModel"
    :readonly="readonly || viewmode"
    :disabled="disabled"
    :hidden="hidden"
    :label="label"
    :return-object="true"
    :clearable="clearable"
    item-value="uid"
    item-title="display_name"
    :items="items"
    variant="solo"
    density="compact"
    class="c-autocomplete"
  >
    <template v-if="$slots.append" #append>
      <div class="append-no-round"></div>
      <slot name="append" />
    </template>
  </v-autocomplete>
</template>
