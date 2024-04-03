<template>
  <c-field-col v-bind="$attrs">
    <v-menu v-model="menuOpen" :close-on-content-click="false">
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
import { dateToStr, strToDate } from "@/utils/common";

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

const validIntervalByStrings = (obj: SrokDTO) => {
  return (
    obj &&
    obj.dateStart &&
    obj.dateStart.value &&
    obj.dateStart.value.length > 0 &&
    obj.dateEnd &&
    obj.dateEnd.value &&
    obj.dateEnd.value.length > 0
  );
};

const validIntervalByDates = (arr: Array<Date>) => {
  return isFinite(Number(arr[0])) && isFinite(Number(arr[1]));
};

const setSelectedDateByStrings = (obj: SrokDTO) => {
  if (validIntervalByStrings(obj)) {
    selectedDate.value[0] = new Date(obj.dateStart.value);
    selectedDate.value[1] = new Date(obj.dateEnd.value);
  } else {
    selectedDate.value = [];
  }
};

const selectedDate = ref([] as Array<Date>);
setSelectedDateByStrings(localValue.value);

const formattedDate = computed(() => {
  return validIntervalByDates(selectedDate.value)
    ? selectedDate.value[0].toLocaleDateString("ru-RU") +
        " - " +
        selectedDate.value[1].toLocaleDateString("ru-RU")
    : "";
});

watch(
  () => props.modelValue,
  (newModelValue) => {
    setSelectedDateByStrings(newModelValue);
  },
  { deep: true },
);

watch(
  selectedDate,
  (arr) => {
    if (arr.length === 0) {
      localValue.value.dateStart.value = "";
      localValue.value.dateEnd.value = "";

      return;
    }

    if (validIntervalByDates(arr)) {
      arr.sort((a, b) => a.getTime() - b.getTime());

      localValue.value.dateStart.value = dateToStr(arr[0]);
      localValue.value.dateEnd.value = dateToStr(arr[1]);

      menuOpen.value = false;
    }
  },
  { deep: true },
);

const updateSelectedDate = (val: string) => {
  if (!val || val.length === 0) {
    selectedDate.value = [];
    return;
  }

  const dates = val.split(" - ");
  if (dates.length === 2) {
    const date1 = strToDate(dates[0]);
    const date2 = strToDate(dates[1]);
    if (date1 && date2 && isFinite(Number(date1)) && isFinite(Number(date2))) {
      selectedDate.value[0] = date1;
      selectedDate.value[1] = date2;
    }
  }
};
</script>
