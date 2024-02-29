<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>
    <br />
    <br />

    <v-date-picker v-model="arrdate" multiple="2"></v-date-picker>

    <c-range-date-picker
      v-model="dateRange"
      label="range date-picker"
      :hidden="false"
      :readonly="false"
      cols="3"
    />
    <br />
    <br />

    <c-date-picker
      v-model="dateField"
      label="Дата"
      :hidden="false"
      :readonly="false"
      cols="3"
    />
    <br />
    <br />

    <c-range-date-picker-old
      v-model="dateRange"
      label="range date-picker old"
      cols="6"
    />
    <br />
    <br />

    <c-btn class="outer-app-bar-nav-icon" hint="fffffff" @click="debugDate">
      <v-icon>mdi-menu</v-icon>
    </c-btn>
    <br />
    <br />

    <c-btn class="outer-app-bar-nav-icon" hint="fffffff" @click="debugDate2">
      <v-icon>mdi-menu</v-icon>
    </c-btn>
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
import CDatePicker from "@/components/common/CDatePicker.vue";
import CBtn from "@/components/common/CBtn.vue";
import CRangeDatePicker from "@/components/common/CRangeDatePicker.vue";
import CRangeDatePickerOld from "@/components/common/CRangeDatePickerOld.vue";

setTitle("datepicker");

const date = ref();

const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();

date.value = new Date();
buttondisplay.value = new Date();
icondisplay.value = new Date();

const dateField = ref();

dateField.value = "2024-02-07";

//const dateRange =  new SrokDTO();

/*
const dateStart2 =   ref("2024-02-07");
const dateEnd2 =   ref("2024-02-07");


const dateRange = ref({
  dateStart: dateStart2,
  dateEnd:  dateEnd2,
});
*/

const dateRange = ref({
  dateStart: { value: "2024-02-07" },
  dateEnd: { value: "2024-02-09" },
});

const debugDate = () => {
  dateField.value = "2024-02-23";
};

const debugDate2 = () => {
  /* eslint-disable-next-line  no-console */
  console.log(dateField);
  /* eslint-disable-next-line  no-console */
  console.log(dateRange.value);
};

const arrdate = ref();

arrdate.value = [new Date("2024-02-07"), new Date("2024-02-09")];
</script>
