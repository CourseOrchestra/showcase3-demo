<template>
  <c-field-col v-bind="$attrs">
    <v-label
      v-if="!props.hidden"
      :class="`masked${readonly ? ' readonly' : ''}`"
    >
      {{ label }}
    </v-label>
    <v-menu v-model="menuOpen" :close-on-content-click="false">
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
        multiple="2"
        hide-header
      >
      </v-date-picker>
    </v-menu>
  </c-field-col>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, PropType } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";
import { vMaska } from "maska";
import { SrokDTO } from "@/apidtos";

const props = defineProps({
  modelValue: {
    type: Object as PropType<SrokDTO>,
    required: true,
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

const mask = { mask: "##.##.#### - ##.##.####" };

const menuOpen = ref(false);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const selectedDate =
  localValue.value &&
  localValue.value.dateStart &&
  localValue.value.dateStart.value &&
  localValue.value.dateStart.value.length > 0 &&
  localValue.value.dateEnd &&
  localValue.value.dateEnd.value &&
  localValue.value.dateEnd.value.length > 0
    ? ref([
        new Date(localValue.value.dateStart.value),
        new Date(localValue.value.dateEnd.value),
      ])
    : ref([]);

const formattedDate = computed(() => {
  return selectedDate.value &&
    selectedDate.value[0] &&
    isFinite(Number(selectedDate.value[0])) &&
    selectedDate.value[1] &&
    isFinite(Number(selectedDate.value[1]))
    ? selectedDate.value[0].toLocaleDateString("ru-RU") +
        " - " +
        selectedDate.value[1].toLocaleDateString("ru-RU")
    : "";
});

watch(
  () => props.modelValue,
  (newDate) => {
    if (
      newDate.dateStart &&
      newDate.dateStart.value &&
      newDate.dateStart.value.length > 0 &&
      newDate.dateEnd &&
      newDate.dateEnd.value &&
      newDate.dateEnd.value.length > 0
    ) {
      selectedDate.value[0] = new Date(newDate.dateStart.value);
      selectedDate.value[1] = new Date(newDate.dateEnd.value);
    } else {
      selectedDate.value = [];
    }
  },
  { deep: true },
);

watch(selectedDate, (d) => {
  if (d.length === 0) {
    localValue.value.dateStart.value = "";
    localValue.value.dateEnd.value = "";

    return;
  }

  if (d && isFinite(Number(d[0])) && isFinite(Number(d[1]))) {
    let month = "" + (d[0].getMonth() + 1),
      day = "" + d[0].getDate();
    let year = d[0].getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const str1 = [year, month, day].join("-");

    (month = "" + (d[1].getMonth() + 1)), (day = "" + d[1].getDate());
    year = d[1].getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const str2 = [year, month, day].join("-");

    localValue.value.dateStart.value = str1;
    localValue.value.dateEnd.value = str2;

    menuOpen.value = false;
  }
});

const updateSelectedDate = (val: string) => {
  if (!val || val.length === 0) {
    selectedDate.value = [];
    return;
  }

  const dates = val.split(" - ");
  if (dates.length === 2) {
    let parts = dates[0].split(".");
    if (
      parts.length === 3 &&
      parts[0].length === 2 &&
      parts[1].length === 2 &&
      parts[2].length === 4
    ) {
      const date1 = new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0]),
      );

      parts = dates[1].split(".");
      if (
        parts.length === 3 &&
        parts[0].length === 2 &&
        parts[1].length === 2 &&
        parts[2].length === 4
      ) {
        const date2 = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0]),
        );
        if (isFinite(Number(date1)) && isFinite(Number(date2))) {
          selectedDate.value[0] = date1;
          selectedDate.value[1] = date2;
        }
      }
    }
  }
};
</script>
