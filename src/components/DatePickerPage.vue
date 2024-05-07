<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Новый календарь</h1>


    <br />
    <br />


    <c-f-text-field
        v-model="intField"
        :type="TextFieldType.number"
    ></c-f-text-field>



<!--
    <c-f-text-field
        v-model.number="intField"
        outlined
        type="number"
    ></c-f-text-field>
-->




    <br />
    <br />


    <c-f-autocomplete
        label="Autocomplete"
        :readonly=readonly
    ></c-f-autocomplete>

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

    <c-range-date-picker
      v-model="dateRange"
      label="range date-picker"
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

    <v-toolbar-items>
      <c-btn @click="debugDate"> Задать дату </c-btn>
      <c-btn @click="debugRange"> Задать интервал </c-btn>
      <c-btn @click="debugDate2"> Вывод </c-btn>
    </v-toolbar-items>
  </vContainer>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {setTitle, TextFieldType} from "@/utils/common";
import CDatePicker from "@/components/common/CDatePicker.vue";
import CBtn from "@/components/common/CBtn.vue";
import CRangeDatePicker from "@/components/common/CRangeDatePicker.vue";
import CRangeDatePickerOld from "@/components/common/CRangeDatePickerOld.vue";
import CFAutocomplete from "@/components/common/CFAutocomplete.vue";
import {IntegerField, StringField} from "@/apidtos/basetypes";
import CFTextField from "@/components/common/CFTextField.vue";


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



//let intField : IntegerField;


const intField = ref<IntegerField>({
  value: null,

  error: [],

  lookup: false,
  label: "Текст",
  readonly: false,
  hidden: false,
});




const num = ref();

const readonly = ref(false);

const dateField = ref();
dateField.value = "2024-02-07";
//dateField.value = null;

const dateRange = ref({
  dateStart: {
    value: "2024-02-07",
    param: "param",
  },
  dateEnd: { value: "2024-02-09" },
});

/*
const dateRange = ref({
  dateStart: { value: null },
  dateEnd: { value: null },
});
*/

const debugDate = () => {
  dateField.value = "2024-02-23";
  //dateField.value = null;
};

const debugRange = () => {
  dateRange.value.dateStart.value = "2024-02-21";
  dateRange.value.dateEnd.value = "2024-02-27";

  //dateRange.value.dateStart.value = null;
  //dateRange.value.dateEnd.value = null;
};

const debugDate2 = () => {

  readonly.value = !readonly.value;

  /* eslint-disable-next-line  no-console */
  console.log(dateField);
  /* eslint-disable-next-line  no-console */
  console.log(dateRange.value);

  console.log("-------------");
//  console.log(num.value);
  console.log(intField);
};
</script>
