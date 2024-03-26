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
import { inject, ref } from "vue";
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
      severity: ErrorDescrSeverity.error,
      descr: "dd1",
      errorType: 0,
    },
    {
      severity: ErrorDescrSeverity.error,
      descr: "dd2",
      errorType: 0,
    },
  ];
};

const debug2 = () => {
  stringField.value.error = [];
};

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const axios: any = inject("axios");
const debug3 = () => {
  /* eslint-disable-next-line  no-console */
  //console.log(response);

  axios
    .post(
      "/api/1.0/spellcheck",
      JSON.stringify({ text: stringField.value.value }),
      {},
    )
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    .then((response: any) => {
      if (response && response.data) {
        stringField.value.error = [];
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        response.data.forEach((element: any) =>
          stringField.value.error.push({
            severity: ErrorDescrSeverity.error,
            descr: element,
            errorType: 0,
          }),
        );
      }
    })
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    .catch((error: any) => {
      /* eslint-disable-next-line  no-console */
      console.log("---------------------------");
      /* eslint-disable-next-line  no-console */
      console.log(error);

      stringField.value.error = [
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
    });
};
</script>
