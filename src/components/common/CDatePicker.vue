<template>
  <c-field-col v-bind="$attrs">
    <v-label
      v-if="!props.hidden"
      :class="`masked${readonly ? ' readonly' : ''}`"
    >
      {{ label }}
    </v-label>
    <v-menu v-model="isMenuOpen">
      <template v-if="!props.hidden" #activator="{ props }">
        <v-text-field
          v-maska:[mask]
          :model-value="formattedDate"
          v-bind="props"
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

const isMenuOpen = ref(false);
const selectedDate = ref(new Date(props.modelValue));

const formattedDate = computed(() => {
  return selectedDate.value && isFinite(Number(selectedDate.value))
    ? selectedDate.value.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";
});

watch(
  () => props.modelValue,
  (newDate) => {
    selectedDate.value = new Date(newDate);
  },
);

watch(selectedDate, (d) => {
  let str;
  if (isFinite(Number(d))) {
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    str = [year, month, day].join("-");
  } else {
    str = "";
  }
  emit("update:modelValue", str);
});

const updateSelectedDate = (val: string) => {
  if (!val) {
    selectedDate.value = new Date("");
    return;
  }

  const parts = val.split(".");
  if (
    parts.length === 3 &&
    parts[0].length === 2 &&
    parts[1].length === 2 &&
    parts[2].length === 4
  ) {
    const date = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]),
    );
    if (isFinite(Number(date))) {
      selectedDate.value = date;
    }
  }
};
</script>
