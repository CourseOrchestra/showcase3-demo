<template>
  <v-data-table-server
    v-model="localModelValue"
    v-model:items-per-page="localItemPerPage"
    v-model:page="localPage"
    :items-per-page-options="[
      { title: '10', value: 10 },
      { title: '25', value: 25 },
      { title: '50', value: 50 },
      { title: '100', value: 100 },
      { title: 'Показать все', value: 5000 },
    ]"
    items-length="100000000"
    :headers="props.headers"
    :items="props.items"
    :show-current-page="true"
    :show-select="showSelect"
    :return-object="showSelect"
    class="c-grid"
    @update:options="refreshGrid"
  >
    <template
      v-for="(_, slot) of $slots"
      #[slot]="//@ts-ignore
     scope"
    >
      <slot v-if="slot === 'top'" name="top"></slot>
      <slot
        v-if="slot.toString().substring(0, 5) === 'item.'"
        :name="slot"
        v-bind="scope"
      />
    </template>

    <template
      v-for="h in headers"
      #[`header.${h.key}`]="{
        /*column*/
      }"
      :key="h.key"
    >
      <v-tooltip location="top">
        <template #activator="{ props }">
          <span
            v-bind="props"
            :style="`
                -webkit-line-clamp:  ${headersLineClamp};
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
              `"
          >
            {{ h.title }}
          </span>
        </template>
        <span>{{ h.title }}</span>
      </v-tooltip>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { useURLMapper } from "showcase3/src/library/URLMapper";

const props = defineProps({
  modelValue: {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    type: Object as PropType<Array<any>>,
    default: null,
  },
  page: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  items: {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    type: Object as PropType<Array<any>>,
    required: true,
  },
  headers: {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    type: Object as PropType<any>,
    required: true,
  },
  headersLineClamp: {
    type: Number,
    default: 3,
  },
  showSelect: {
    type: Boolean,
  },
});

const emits = defineEmits([
  "refresh",
  "update:modelValue",
  "update:page",
  "update:itemsPerPage",
]);

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const localPage = computed({
  get() {
    return props.page;
  },
  set(value) {
    emits("update:page", value);
  },
});
const localItemPerPage = computed({
  get() {
    return props.itemsPerPage;
  },
  set(value) {
    emits("update:itemsPerPage", value);
  },
});

useURLMapper([
  {
    name: "g-page",
    obj: localPage,
    props: ["value"],
  },
  {
    name: "g-items-per-page",
    obj: localItemPerPage,
    props: ["value"],
  },
]);

function refreshGrid() {
  emits("refresh");
}
</script>
