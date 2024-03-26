<template>
  <c-field-col v-bind="$attrs">
    <c-textarea
      v-model="localValue.value"
      :label="props.label || localValue.label"
      :readonly="props.readonly || localValue.readonly"
      :hidden="localValue.hidden"
      :messages="getWarning(localValue.error)"
      :error-messages="getError(localValue.error)"
      :rows="rows"
      @update:model-value="spellcheck"
    />
  </c-field-col>
</template>

<script setup lang="ts">
import {
  ErrorDescr,
  ErrorDescrSeverity,
  StringField,
} from "@/apidtos/basetypes";
import { stringFieldDefaults } from "@/apidtos";
import { inject, PropType } from "vue";
import { computed } from "vue";
import CTextarea from "@/components/common/CTextarea.vue";
import CFieldCol from "@/components/common/CFieldCol.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<StringField>,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
  spellcheck: {
    type: Boolean,
    default: true,
  },
  spellcheckDelay: {
    type: Number,
    default: 2000,
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get() {
    return (props.modelValue as StringField) || stringFieldDefaults;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function getError(error: Array<ErrorDescr>) {
  return (
    error
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      .filter((it: any) => it.severity === ErrorDescrSeverity.error)
      .map((arr) => arr.descr)
      .join("; ")
  );
}
function getWarning(error: Array<ErrorDescr>) {
  return (
    error
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      .filter((it: any) => it.severity === ErrorDescrSeverity.warning)
      .map((arr) => arr.descr)
      .join("; ")
  );
}

let timerId: NodeJS.Timeout;
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const axios: any = inject("axios");
const spellcheck = (val: string) => {
  if (!props.spellcheck) {
    return;
  }

  clearTimeout(timerId);

  timerId = setTimeout(() => {
    axios
      .post("/api/1.0/spellcheck", JSON.stringify({ text: val }), {})
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      .then((response: any) => {
        localValue.value.error = [];
        if (response && response.data) {
          response.data.forEach((element: string) =>
            localValue.value.error.push({
              severity: ErrorDescrSeverity.error,
              descr: element,
              errorType: 0,
            }),
          );
        }
      })
      .catch((error: object) => {
        /* eslint-disable-next-line  no-console */
        console.log(error);

        /*

        localValue.value.error = [
          {
            severity: ErrorDescrSeverity.error,
            descr:
              "dd1sdfsd sdfdsfsdfsdfs sfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdf",
            errorType: 0,
          },
          {
            severity: ErrorDescrSeverity.error,
            descr: "dd2 23123123212 234234234234 34534534534 34534534534534",
            errorType: 0,
          },
        ];

//        localValue.value.error = [];

*/
      });
  }, props.spellcheckDelay);
};
</script>
