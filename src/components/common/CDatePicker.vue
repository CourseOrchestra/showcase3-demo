<template>
  <c-field-col v-bind="$attrs">
    <v-label
      v-if="!props.hidden"
      :class="`masked${readonly ? ' readonly' : ''}`"
    >
      {{ label }}
    </v-label>
    <v-menu>
      <template v-if="!props.hidden" #activator="{ props }">
        <v-text-field
          v-maska:[mask]
          :model-value="formattedDate"
          v-bind="props"
          clearable
          append-inner-icon="mdi-calendar"
          :disabled="readonly"
          :class="`masked${readonly ? ' readonly' : ''}`"
          @update:model-value="updateSelectedDate"
        ></v-text-field>
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
import { vMaska } from "maska";
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
});

const emit = defineEmits(["update:modelValue"]);

const mask = { mask: "##.##.####" };

const selectedDate = ref(new Date(props.modelValue ? props.modelValue : ""));

const formattedDate = computed(() => {
  return selectedDate.value && isFinite(Number(selectedDate.value))
    ? selectedDate.value.toLocaleDateString("ru-RU")
    : "";
});

watch(
  () => props.modelValue,
  (newDate) => {
    selectedDate.value = new Date(newDate);
  },
);

watch(selectedDate, (d) => {
  const str = isFinite(Number(d)) ? dateToStr(d) : "";
  emit("update:modelValue", str);
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
