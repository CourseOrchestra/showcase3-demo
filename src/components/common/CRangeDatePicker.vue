<template>
  <c-field-col v-bind="$attrs">
    <label>{{ label }}</label>
    <DatePicker
      v-model="srokComputed"
      clearable
      text-input
      range
      model-type="format"
      position="right"
      format="dd.MM.yyyy"
      locale="ru-RU"
      select-text="OK"
      cancel-text="Отменить"
      :class="`range-masked${readonly ? ' readonly' : ''}`"
      :hidden="hidden"
      :disabled="readonly"
    />
  </c-field-col>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
//import { SrokDTO } from "@/apidtos";
import { formatDate, parseDate } from "@/utils/common";
import { MaskInput } from "maska";
import { onMounted } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    //type: Object as PropType<SrokDTO>,
    type: Object as PropType<unknown>,
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

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const srokComputed = computed({
  get: () => {
    if (localValue.value) {
      const srok = [] as Array<string>;
      srok[0] = formatDate(localValue.value.dateStart.value) || "";
      srok[1] = formatDate(localValue.value.dateEnd.value) || "";
      return srok;
    }
    return null;
  },
  set: (value) => {
    if (value && value.length && value[0] && value[1]) {
      localValue.value.dateStart.value = parseDate(value[0]) || "";
      localValue.value.dateEnd.value = parseDate(value[1]) || "";
    } else {
      localValue.value.dateStart.value = "";
      localValue.value.dateEnd.value = "";
    }
  },
});

onMounted(() => {
  new MaskInput(
    document.querySelectorAll(
      ".range-masked input",
      // eslint-disable-next-line no-undef
    ) as NodeListOf<HTMLInputElement>,
    { mask: "##.##.#### - ##.##.####" },
  );
});
</script>

<style scoped></style>
