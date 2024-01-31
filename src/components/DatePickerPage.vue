<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>
    <br />
    <br />

    <h2>Собственно, календарь</h2>
    <div class="card flex">
      <Calendar v-model="date" date-format="dd/mm/yy" />
    </div>

    <br />
    <h2>Дополнительные способы показа календаря</h2>
    <br />
    <div class="card flex flex-wrap gap-3 p-fluid">
      <div class="flex-auto">
        <label for="buttondisplay" class="font-bold block mb-2">
          По кнопке
        </label>
        <Calendar v-model="buttondisplay" show-icon input-id="buttondisplay" />
      </div>
      <div class="flex-auto">
        <label for="icondisplay" class="font-bold block mb-2">
          По картинке
        </label>
        <Calendar
          v-model="icondisplay"
          show-icon
          icon-display="input"
          input-id="icondisplay"
        />
      </div>
      <div class="flex-auto">
        <label for="templatedisplay" class="font-bold block mb-2">
          По шаблону картинки
        </label>
        <Calendar
          v-model="templatedisplay"
          show-icon
          icon-display="input"
          time-only
          input-id="templatedisplay"
        >
          <template #inputicon="{ clickCallback }">
            <i class="pi pi-clock" @click="clickCallback" />
          </template>
        </Calendar>
      </div>
    </div>
  </vContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { setTitle } from "@/utils/common";

setTitle("datepicker");

const date = ref();

const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();

date.value = new Date();
buttondisplay.value = new Date();
icondisplay.value = new Date();
</script>
