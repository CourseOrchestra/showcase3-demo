<template>
  <c-field-col v-bind="$attrs">
    <v-label
      v-if="!props.hidden"
      :class="`masked${readonly ? ' readonly' : ''}`"
    >
      {{ label }}
    </v-label>
    <v-menu v-model="isMenuOpen" :close-on-content-click="false">
      <template v-if="!props.hidden" #activator="{ props }">
        <v-text-field
          v-maska:[mask]
          :model-value="formattedDate"
          v-bind="props"
          append-inner-icon="mdi-calendar"
          :disabled="readonly"
          :class="`masked${readonly ? ' readonly' : ''}`"
          @update:model-value="updateSelectedDate"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="selectedDate"
        :disabled="readonly"
        :class="`masked${readonly ? ' readonly' : ''}`"
        show-adjacent-months
        multiple="2"
        hide-header
      >
      </v-date-picker>
    </v-menu>
  </c-field-col>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, PropType } from "vue";
import CFieldCol from "@/components/common/CFieldCol.vue";
import { vMaska } from "maska";
import { SrokDTO } from "@/apidtos";

const props = defineProps({
  modelValue: {
    type: Object as PropType<SrokDTO>,
    required: true,
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
});

const emit = defineEmits(["update:modelValue"]);

const mask = { mask: "##.##.#### - ##.##.####" };

const isMenuOpen = ref(false);
const selectedDate = ref([
  new Date(props.modelValue.dateStart.value),
  new Date(props.modelValue.dateEnd.value),
]);

const formattedDate = computed(() => {
  return selectedDate.value
  && selectedDate.value[0] && isFinite(Number(selectedDate.value[0]))
  && selectedDate.value[1] && isFinite(Number(selectedDate.value[1]))
    ? selectedDate.value[0].toLocaleDateString("ru-RU")+"-"+selectedDate.value[1].toLocaleDateString("ru-RU")
    : "";
});

watch(
  () => props.modelValue,
  (newDate) => {
    selectedDate.value[0] = new Date(newDate.dateStart.value);
    selectedDate.value[1] = new Date(newDate.dateEnd.value);
  }, {deep: true}
);

watch(selectedDate, (d) => {





  let str;
  if ( d && isFinite(Number(d[0])) && isFinite(Number(d[1])))  {
    let month = "" + (d[0].getMonth() + 1),
        day = "" + d[0].getDate();
    let year = d[0].getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const str1 = [year, month, day].join("-");


    month = "" + (d[1].getMonth() + 1),
    day = "" + d[1].getDate();
    year = d[1].getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const str2 = [year, month, day].join("-");


    str = str1 + " - " +str2;


  } else {
    str = "";
  }
  emit("update:modelValue", str);




});

const updateSelectedDate = (val: string) => {

/*

  if (!val) {
    selectedDate.value = new Date("");
    return;
  }

  const parts = val.split(".");
  if (
    parts.length === 3 &&
    parts[0].length === 2 &&
    parts[1].length === 2 &&
    parts[2].length === 4
  ) {
    const date = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]),
    );
    if (isFinite(Number(date))) {
      selectedDate.value = date;
    }
  }

*/


};
</script>
