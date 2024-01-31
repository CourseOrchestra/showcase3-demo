<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>
    <br />
    <br />

    <div class="card flex flex-wrap gap-3 p-fluid">
      <div class="flex-auto">
        <label for="buttondisplay" class="font-bold block mb-2">
          Button Display
        </label>
        <Calendar v-model="buttondisplay" show-icon input-id="buttondisplay" />
      </div>
      <div class="flex-auto">
        <label for="icondisplay" class="font-bold block mb-2">
          Icon Display
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
          Icon Template
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

const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();
</script>
