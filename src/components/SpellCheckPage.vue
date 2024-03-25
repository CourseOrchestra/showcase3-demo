<template>
  <vContainer>
    <h1 class="text-center">Проверка орфографии, стилистики и грамматики</h1>
    <br />
    <br />

    <c-f-textarea v-model="stringField" cols="4" :rows="5" />
    <br />
    <br />

    <v-toolbar-items>
      <c-btn @click="debugDate"> Задать дату </c-btn>
      <c-btn @click="debugRange"> Задать интервал </c-btn>
      <c-btn @click="debugDate2"> Вывод </c-btn>
    </v-toolbar-items>
  </vContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { setTitle } from "@/utils/common";
import CFTextarea from "@/components/common/CFTextarea.vue";
import CBtn from "@/components/common/CBtn.vue";
import { StringField } from "@/apidtos/basetypes";

setTitle("spellcheck");

const stringField = ref<StringField>({
  value:
    "программа многоязчная программа проверке орфогрфии, стилистики и грамматики",

  error: [],
  lookup: false,
  label: "Текст",
  readonly: false,
  hidden: false,

  /*

  error: Array<ErrorDescr>,
  lookup: boolean
  label: string;
  readonly: boolean;
  hidden: boolean;

*/
});

const debugDate = () => {};

const debugRange = () => {};

const debugDate2 = () => {
  /* eslint-disable-next-line  no-console */
  /* eslint-disable-next-line  no-console */
};
</script>
