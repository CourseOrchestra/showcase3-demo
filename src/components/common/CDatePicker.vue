eslint-disable-next-line
<template>
  <c-field-col v-bind="$attrs">
    <v-menu v-model="menuOpen" :close-on-content-click="false">
      <!-- eslint-disable-next-line  vue/no-template-shadow -->
      <template v-if="!props.hidden" #activator="{ props }">
        <v-text-field
          v-maska:[mask]
          :model-value="formattedDate"
          :readonly="readonly || viewmode"
          :disabled="disabled"
          :hidden="hidden"
          :label="label"
          :clearable="clearable"
          :placeholder="placeholder"
          variant="solo"
          density="compact"
          @update:model-value="updateSelectedDate"
        >
          <template #append-inner>
            <v-icon icon="mdi-calendar" v-bind="props" />
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="selectedDate"
        :disabled="readonly"
        :class="`masked${readonly ? ' readonly' : ''}`"
        show-adjacent-months
      >
      </v-date-picker>
    </v-menu>
  </c-field-col>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";
import { vMaska } from "maska/vue";
import { dateToStr, strToDate } from "@/utils/common";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
  },
  hidden: {
    type: Boolean,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: null,
  },
  viewmode: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const mask = { mask: "##.##.####" };

const menuOpen = ref(false);
const getDateByStr = (str: string) => {
  return new Date(str ? str : "");
};

const selectedDate = ref(getDateByStr(props.modelValue));

const formattedDate = computed(() => {
  return selectedDate.value && isFinite(Number(selectedDate.value))
    ? selectedDate.value.toLocaleDateString("ru-RU")
    : "";
});

watch(
  () => props.modelValue,
  (newDate) => {
    selectedDate.value = getDateByStr(newDate);
  },
);

watch(selectedDate, (d) => {
  const str = isFinite(Number(d)) ? dateToStr(d) : "";
  emit("update:modelValue", str);
  menuOpen.value = false;
});

const updateSelectedDate = (val: string) => {
  if (!val) {
    selectedDate.value = new Date("");
    return;
  }

  const date = strToDate(val);
  if (date && isFinite(Number(date))) {
    selectedDate.value = date;
  }
};
</script>
