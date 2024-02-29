<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>
    <br />
    <br />

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

    <c-btn class="outer-app-bar-nav-icon" hint="fffffff" @click="debugRange">
      <v-icon>mdi-menu</v-icon>
    </c-btn>
    <br />
    <br />

    <c-btn class="outer-app-bar-nav-icon" hint="fffffff" @click="debugDate2">
      <v-icon>mdi-menu</v-icon>
    </c-btn>
    <br />
    <br />
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

/*

const date = ref();
date.value = new Date();

const dateRange =  new SrokDTO();

const dateStart2 =   ref("2024-02-07");
const dateEnd2 =   ref("2024-02-07");

const dateRange = ref({
  dateStart: dateStart2,
  dateEnd:  dateEnd2,
});
*/

const dateField = ref();
dateField.value = "2024-02-07";

/*
const dateRange = ref({
  dateStart: { value: "2024-02-07" },
  dateEnd: { value: "2024-02-09" },
});
*/

const dateRange = ref({
  dateStart: { value: "" },
  dateEnd: { value: "" },
});

const debugDate = () => {
  dateField.value = "2024-02-23";
};

const debugRange = () => {
  dateRange.value.dateStart.value = "2024-02-21";
  dateRange.value.dateEnd.value = "2024-02-27";
};

const debugDate2 = () => {
  /* eslint-disable-next-line  no-console */
  console.log(dateField);
  /* eslint-disable-next-line  no-console */
  console.log(dateRange.value);
};
</script>
