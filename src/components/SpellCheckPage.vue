<template>
  <vContainer>
    <h1 class="text-center">Проверка орфографии, стилистики и грамматики</h1>
    <br />
    <br />

    <c-f-textarea v-model="stringField" cols="4" :rows="5" />
    <br />
    <br />

    <v-toolbar-items>
      <c-btn @click="debug1"> Задать ошибки</c-btn>
      <c-btn @click="debug2"> Убрать ошибки</c-btn>
      <c-btn @click="debug3"> Вывод</c-btn>
    </v-toolbar-items>
  </vContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { setTitle } from "@/utils/common";
import CFTextarea from "@/components/common/CFTextarea.vue";
import CBtn from "@/components/common/CBtn.vue";
import { ErrorDescrSeverity, StringField } from "@/apidtos/basetypes";

setTitle("spellcheck");

const stringField = ref<StringField>({
  value:
    "программа многоязчная программа проверке орфогрфии, стилистики и грамматики",

  error: [],

  lookup: false,
  label: "Текст",
  readonly: false,
  hidden: false,
});

const debug1 = () => {
  stringField.value.error = [
    {
      severity: ErrorDescrSeverity.warning,
      descr: "dd1",
      errorType: 0,
    },
    {
      severity: ErrorDescrSeverity.warning,
      descr: "dd2",
      errorType: 0,
    },
  ];
};

const debug2 = () => {
  stringField.value.error = [];
};

const debug3 = () => {
  /* eslint-disable-next-line  no-console */
  console.log(stringField);
};
</script>
