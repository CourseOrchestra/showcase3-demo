<template>
  <c-field-col v-bind="$attrs">
    <label>{{ label }}</label>
    <date-picker
      v-model="localValue"
      :class="`masked${readonly ? ' readonly' : ''}`"
      :hidden="hidden"
      :disabled="readonly"
      model-type="timestamp"
      position="right"
      format="dd.MM.yyyy"
      locale="ru-RU"
      select-text="OK"
      cancel-text="Отменить"
      text-input
      clearable
    />
  </c-field-col>
</template>

<script lang="ts">
import { computed } from "vue";
import { MaskInput } from "maska";
import CFieldCol from "@/components/common/CFieldCol.vue";

function formatDate(val: number) {
  if (!val) {
    return null;
  }

  const d = new Date(val);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default {
  name: "CDatePicker",
  components: { CFieldCol },
  props: {
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
  },
  emits: ["update:modelValue"],
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  setup(props: any, context: any) {
    const localValue = computed({
      get: () => props.modelValue,
      set: (value) => context.emit("update:modelValue", formatDate(value)),
    });
    return {
      localValue,
    };
  },
  mounted() {
    new MaskInput(
      document.querySelectorAll(
        ".masked input",
        // eslint-disable-next-line no-undef
      ) as NodeListOf<HTMLInputElement>,
      { mask: "##.##.####" },
    );
  },
};
</script>
